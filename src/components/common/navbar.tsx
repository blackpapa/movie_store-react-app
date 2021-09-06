import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

interface User {
  _id: string,
  name: string,
  isAdmin? : boolean,
}

interface Props {
  user: User
}
 
interface State {
  isCollapsed: boolean
}
 
class NavBar extends Component<Props, State> {
  state = { isCollapsed: true };

  handleCollapse = () => {
    const isCollapsed = !this.state.isCollapsed;
    this.setState({ isCollapsed });
  };

  render() {
    const { user } = this.props;
    const { isCollapsed } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className={`navbar-toggler ${isCollapsed ? "collapsed" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded={isCollapsed ? "false" : "true"}
            aria-label="Toggle navigation"
            onClick={this.handleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${isCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink className="nav-link" aria-current="page" to="/movies">
                Movies
              </NavLink>
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
              {!user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/me">
                    {user.name}
                  </NavLink>
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
