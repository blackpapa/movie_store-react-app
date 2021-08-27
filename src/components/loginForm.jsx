import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: { username: "", password: "" },
  };

  schemaObj = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  schema = Joi.object(this.schemaObj);

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    //call the server
    console.log("submitted");
  };

  validate = () => {
    const errors = { ...this.state.errors };
    const { error } = this.schema.validate(this.state.account, {
      abortEarly: false,
    });

    if (!error) return null;

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

    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form-login">
        <Input
          label="Username"
          name="username"
          value={account.username}
          onChange={this.handleChange}
          error={errors.username}
        />
        <Input
          label="Password"
          name="password"
          value={account.password}
          onChange={this.handleChange}
          error={errors.password}
        />
        <button className="btn mt-3 w-100 btn-primary">Login</button>
        <p className="mt-5 mb-3 text-muted text-center">© 2017–2021</p>
      </form>
    );
  }
}

export default LoginForm;
