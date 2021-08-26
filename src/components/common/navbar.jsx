import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link active" aria-current="page" to="#">
              Home
            </NavLink>
            <NavLink className="nav-link" to="#">
              Features
            </NavLink>
            <NavLink className="nav-link" to="#">
              Pricing
            </NavLink>
            <NavLink
              className="nav-link disabled"
              to="#"
              tabindex="-1"
              aria-disabled="true"
            >
              Disabled
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
