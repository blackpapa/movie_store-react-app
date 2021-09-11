import { ChangeEvent, Component } from "react";
import { RouteComponentProps, StaticContext } from 'react-router';
import {Location} from 'history'
import {Genre }from '../movies'
import Joi from "joi";
import Input from "./input";
import Select from "./select";

interface Data {
  [propName: string]: string | number | boolean | undefined
}

interface Errors {
  [propName: string]: string
}

interface LocationState {
  from: Location
}

interface State {
  data: Data ,
  errors: Errors,
  defaultOption?: string,
  options?: any[],
  genres?: Genre[]
}

interface Props extends RouteComponentProps<{
  [x: string]: string | undefined;
}, StaticContext, LocationState> {
}

class Form extends Component<Props, State> {
  state: State = { data: {}, errors: {}};

  schema: any
  schemaObj: any
  doSubmit : any

  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors: any = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
    const obj = { [name]: value };

    const schema = Joi.object({
      [name]: this.schemaObj[name],
    });

    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const errors: Errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data: Data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton = (label: string) => {
    return (
      <button disabled={this.validate()} className="btn mt-3 w-100 btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name: string, label: string, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        name={name}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name: string, label: string, items: any[], defaultOption = "default") => {
    const { errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        items={items}
        defaultOption={defaultOption}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
 
}

export default Form;
