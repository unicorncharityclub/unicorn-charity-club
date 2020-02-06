
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

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstname: "", lastname: "", email: "", password: "", confirmpassword: "", errors: [] };
  }

  showValidationErr(elm, msg) {
    console.log(msg);
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

  onFirstNameChange(e) {
    this.setState({ firstname: e.target.value });
    this.clearValidationErr("firstname");
  }

  onLastNameChange(e) {
    this.setState({ lastname: e.target.value });
    this.clearValidationErr("lastname");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
  }

  onConfirmPasswordChange(e) {
    this.setState({ confirmpassword: e.target.value });
    this.clearValidationErr("confirmpassword");
  }

  submitRegister(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.state.firstname === "") {
      this.showValidationErr("firstname", "First name cannot be empty");
    }
    if (this.state.lastname === "") {
      this.showValidationErr("lastname", "Last name cannot be empty");
    }
    if (this.state.email === "") {
      this.showValidationErr("email", "Email cannot be empty");
    }
    if (this.state.password === "") {
      this.showValidationErr("password", "Password cannot be empty");
    }
    if (this.state.password !== this.state.confirmpassword) {
      this.showValidationErr("password", "Password and Confirm Password dont match");
    }
    if (this.state.confirmpassword === "") {
      this.showValidationErr("confirmpassword", "Confirm Password cannot be empty");
    }
  }

  render() {
    let emailErr = null,
      passwordErr = null,
      confirmpasswordErr = null;
    console.log(this.state);
    for (let err of this.state.errors) {
      if (err.elm === "email") {
        emailErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if (err.elm === "confirmpassword") {
        confirmpasswordErr = err.msg;
      }
    }
    return (
      <form
        className="register-form form-wrapper"
        name="form"
        onSubmit={this.submitRegister}
      >
        <section>
          <div className="form-item">
            <label>First name:</label>
            <input
              name="firstname"
              type="text"
              id="firstname"
              placeholder="First Name"
              value={this.state.value}
              onChange={this.onFirstNameChange.bind(this)}
            />
          </div>

          <div className="form-item">
            <label>Last name:</label>
            <input
              name="lastname"
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={this.state.value}
              onChange={this.onLastNameChange.bind(this)}
            />
          </div>

          <div className="form-item">
            <label>Email ID:</label>
            <input
              name="email"
              type="text"
              id="email"
              placeholder="Email"
              value={this.state.value}
              onChange={this.onEmailChange.bind(this)}
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div className="form-item">
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

          <div className="form-item">
            <label>Confirm Password:</label>
            <input
              name="password-confirmation"
              type="password"
              id="password-confirmation"
              placeholder="Confirm Password"
              value={this.state.value}
              onChange={this.onConfirmPasswordChange.bind(this)}
            />
            <small className="danger-error">
              {confirmpasswordErr ? confirmpasswordErr : ""}
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
