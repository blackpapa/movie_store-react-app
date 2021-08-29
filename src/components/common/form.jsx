import { Component } from "react";
import Joi from "joi";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = Joi.object({
      [name]: this.schemaObj[name],
    });

    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn mt-3 w-100 btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
