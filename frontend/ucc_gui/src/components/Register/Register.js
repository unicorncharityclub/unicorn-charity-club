
import React, { Component } from "react";
import { Checkbox, FormControlLabel, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mobile_logo from "../../image/Logo-mobile.png";
import DesktopLogo from "../../site_media/Logo_Horizontal_No_Tagline.png";

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

          <div class="header__toolbar not-logged-main">
            <NavLink to="/Login">
              <div class="header__signin-buttons">
                <button class="header__login_button" href="/accounts/log-in/">
                  Log in
                </button>
              </div>
            </NavLink>
          </div>

          <div class="title">
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

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "", errors: [] };
  }

  showValidationErr(elm, msg) {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  }

  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr("username");
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
  }

  submitRegister(e) {
    if (this.state.username === "") {
      this.showValidationErr("Username", "Username cannot be empty");
    }
    if (this.state.email === "") {
      this.showValidationErr("Email", "Email cannot be empty");
    } else if (this.state.password === "") {
      this.showValidationErr("Password", "Password cannot be empty");
    }
  }

  render() {
    let usernameErr = null,
      emailErr = null,
      passwordErr = null;
    for (let err of this.state.errors) {
      if (err.elm === "username") {
        usernameErr = err.msg;
      }
      if (err.elm === "email") {
        emailErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
    }
    return (
      <form
        class="register-form form-wrapper"
        name="form"
        method="POST"

      >
        <section>
          <div class="form-item">
            <label>Username:</label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Username"
              value={this.state.value}
              onChange={this.onUsernameChange.bind(this)}
            />
            <small className="danger-error">
              {usernameErr ? usernameErr : ""}
            </small>
          </div>


          <div class="form-item">
            <label>Email ID:</label>
            <input
              name="username"
              type="text"
              id="email"
              placeholder="Email"
              value={this.state.value}
              onChange={this.onEmailChange.bind(this)}
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div class="form-item">
            <label>Password:</label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.value}
              onChange={this.onPasswordChange.bind(this)}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>

          <div class="form-item">
            <label>Password Confirmation:</label>
            <input
              name="password-confirmation"
              type="password"
              id="password"
              placeholder="Password Confirmation"
              value={this.state.value}
              onChange={this.onPasswordChange.bind(this)}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>

          <div className="terms-checkbox"></div>
          <FormControlLabel
            control={
              <Checkbox
                // checked={this.state.checkedB}
                // onChange={this.handleChange("checkedB")}
                value="checkedB"
                style={{ color: "#1cbfec" }}
              />
            }
            label="I agree to the terms of Unicorn Charity Club"
          />

          <button
            disabled="true"
            id="button"
            className="register-btn"
            type="submit"
            onClick={this.submitRegister.bind(this)}
          >
            Register
          </button>
        </section>
      </form>
    );
  }
}
