import React, { Component } from "react";
import Joi from "joi";
import Form from "./common/form";

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
