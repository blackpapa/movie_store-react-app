import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { getCurrentUser, login } from "../services/authService";
import {  Redirect } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: { username: "", password: "" },
  };

  schemaObj = {
    username: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  schema = Joi.object(this.schemaObj);

  doSubmit = async () => {
    const { data } = this.state;

    try {
      await login(data.username, data.password);
      const { state } = this.props.location;
    
      window.location.href = state ? state.from.pathname : "/";
      
    } catch (error: any) {
      if(error.response) {
        const {data} = error.response;
        toast.info(data)
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <form onSubmit={this.handleSubmit} className="form-login">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")}
        <Link className="nav-link" to="/register">
          <p className="mt-2 text text-center">Register</p>
        </Link>
        <p className="mt-3 mb-3 text-muted text-center">© 2017–2021</p>
      </form>
    );
  }
}

export default LoginForm;
