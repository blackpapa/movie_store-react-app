import React, { Component } from "react";
import Input from "./common/input";

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
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={account.password}
            type="text"
            onChange={this.handleChange}
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        <button className="btn mt-3 w-100 btn-primary">Login</button>
      </form>
    );
  }
}

export default LoginForm;
