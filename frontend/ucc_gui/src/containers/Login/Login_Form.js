import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Register from "../Register/Register";
import "./Login.css";

class Login_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", errors: [] };
  }

  login(e) {
    e.preventDefault();
  }


  render() {
    let emailErr = null,
      passwordErr = null;
    for (let err of this.state.errors) {
      if (err.elm === "email") {
        emailErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
    }

    return (
      <div className="login-form">
        <form className="login__form" name="form" method="POST">

          <div class="form-item">
            <input
              name="username"
              id="email"
              placeholder="Email"
              input
              value={this.state.email}
              type="email"
              name="email"
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
            <ul class="errorlist">
              <li></li>
            </ul>
          </div>
          <div class="form-item">
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              input
              value={this.state.password}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
            <ul class="errorlist">
              <li></li>
            </ul>
          </div>

          <div class="login__field">
            <button
              type="button"
              className="submit-button"
            >
              Log In
            </button>
            <Router>
              <Route path="/Register" component={Register} />
            </Router>

            <NavLink to="/Register">
              <button type="button" className="submit-button">
                Don't have an account?{" "}
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Login_Form;