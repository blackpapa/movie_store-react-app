import React, { Component } from "react";

class LoginForm extends Component {
  state = { account: { username: "", password: "" } };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-login">
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            autoFocus
            value={this.state.account.username}
            type="text"
            id="username"
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={this.state.account.password}
            type="text"
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
