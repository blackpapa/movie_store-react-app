import React, { Component } from "react";
import Joi from "joi";
import Form from "./common/form";
import Input from "./common/input";

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

  doSubmit = () => {
    //call the server
    console.log("submitted");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form-login">
        <Input
          label="Username"
          name="username"
          value={data.username}
          onChange={this.handleChange}
          error={errors.username}
        />
        <Input
          label="Password"
          name="password"
          value={data.password}
          onChange={this.handleChange}
          error={errors.password}
        />
        {this.renderButton("login")}
        <p className="mt-5 mb-3 text-muted text-center">© 2017–2021</p>
      </form>
    );
  }
}

export default LoginForm;
