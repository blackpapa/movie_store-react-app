import React, { Component } from "react";
import Input from "./common/input";
import logo from "../logo.svg";

class LoginForm extends Component {
  state = { account: { username: "", password: "" } };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form-login">
        <Input
          label="Username"
          name="username"
          value={account.username}
          onChange={this.handleChange}
        />
        <Input
          label="Password"
          name="password"
          value={account.password}
          onChange={this.handleChange}
        />
        <button className="btn mt-3 w-100 btn-primary">Login</button>
        <p className="mt-5 mb-3 text-muted text-center">© 2017–2021</p>
      </form>
    );
  }
}

export default LoginForm;
