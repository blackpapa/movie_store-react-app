import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: { username: "", password: "", name: "" },
  };

  schemaObj = {
    username: Joi.string()
      .email({ tlds: { allow: ["com", "net"] } })
      .required()
      .label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  schema = Joi.object(this.schemaObj);

  doSubmit = () => {
    console.log("submit");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-login">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
