import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { login } from "./../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: { username: "", password: "" },
  };

  schemaObj = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  schema = Joi.object(this.schemaObj);

  doSubmit = async () => {
    const { data } = this.state;
    await login(data.username, data.password);

    const { state } = this.props.location;

    window.location = state ? state.from.pathname : "/";
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-login">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")}
        <p className="mt-5 mb-3 text-muted text-center">© 2017–2021</p>
      </form>
    );
  }
}

export default LoginForm;
