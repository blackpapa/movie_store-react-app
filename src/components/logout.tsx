import { Component } from "react";
import { logout } from "../services/authService";

class Logout extends Component {
  state = {};

  componentDidMount() {
    logout();

    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
