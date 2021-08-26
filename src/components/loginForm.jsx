import React, { Component } from "react";

class LoginForm extends Component {
  state = {};
  render() {
    return (
      <form>
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input autoFocus type="text" id="username" className="form-control" />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="text" id="password" className="form-control" />
        </div>
      </form>
    );
  }
}

export default LoginForm;
