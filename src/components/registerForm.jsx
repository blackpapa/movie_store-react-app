import React, { Component } from "react";
import Form from "./common/form";

class RegisterForm extends Form {
  state = { data: {}, errors: {} };
  render() {
    return (
      <form action="" className="form-login">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
