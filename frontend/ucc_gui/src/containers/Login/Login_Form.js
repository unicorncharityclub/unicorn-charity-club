import React from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import axios from "axios";

class Login_Form extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = { email: "", password: "", errors: [] };
  }

  login(e) {
    e.preventDefault();
    console.log(this.state);
    let valid = true;
    if (this.state.email === "") {
      this.showValidationErr("email", "Email cannot be empty");
      valid=false;
    }
    else {
      let emailValid = this.state.email.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
      );
      if (emailValid === null) {
        valid = false;
        this.showValidationErr("email", "Invalid Email id");
      }
    }

    if (this.state.password === "") {
      this.showValidationErr("password", "Password cannot be empty");
      valid=false;
    }

    if(valid===true) {
      //TODO: access the api
    }
  }

  handleInsert(obj, event) {
    var status = "";
    axios
      .post(`http://127.0.0.1:8000/register/`, this.state)
      .then(function(response) {
        status = response.data["status"];
        obj.updateResponseStatus(status);
      })
      .catch(function(error) {
        console.log(error);
      });
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

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
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

          <div className="form-item">
            <input
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onEmailChange.bind(this)}
              type="email"
              name="email"
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div className="form-item">
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onPasswordChange.bind(this)}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>

          <div className="login__field">
            <button
              type="button"
              onClick={this.login}
              className="submit-button"
            >
              Log In
            </button>

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