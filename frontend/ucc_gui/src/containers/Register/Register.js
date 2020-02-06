
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mobile_logo from "../../image/Logo-mobile.png";
import DesktopLogo from "../../site_media/Logo_Horizontal_No_Tagline.png";
import RegisterForm from "./RegisterForm";
import "./Register.css";

class Register extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className="header">
            <div className="header__logo main">
              <a href="/">
                <img
                  src={DesktopLogo}
                  className="header__logo-desktop"
                  alt="Unicorn Charity Club"
                />
                <img
                  src={Mobile_logo}
                  className="header__logo-mobile"
                  alt="Unicorn Charity Club"
                  style={{ width: "250px" }}
                />
              </a>
            </div>
          </header>

          <div className="header__toolbar not-logged-main">
            <NavLink to="/Login">
              <div className="header__signin-buttons">
                <button className="header__login_button" href="/accounts/log-in/">
                  Log in
                </button>
              </div>
            </NavLink>
          </div>

          <div className="title">
            <span>Let's get you started with Unicron Charity Club!!</span>
          </div>
          <RegisterForm />
        </div>
        <Route path="/Login" />
      </Router>
    );
  }
}
export default Register;

