import React, { Component } from "react";

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
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            autoFocus
            value={account.username}
            onChange={this.handleChange}
            type="text"
            name="username"
            id="username"
            className="form-control"
          />
        </div>
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
