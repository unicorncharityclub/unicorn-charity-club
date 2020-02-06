import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstname: "", lastname: "", email: "", password: "", confirmpassword: "", terms: "", errors: [] };
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

  onTermsChange(e) {
    this.setState({ terms: e.target.checked });
    this.clearValidationErr("terms");
  }

  submitRegister(e) {
    e.preventDefault();
    let valid = true;
    if (this.state.firstname === "") {
      valid = false;
      this.showValidationErr("firstname", "First name cannot be empty");
    }
    if (this.state.lastname === "") {
      valid = false;
      this.showValidationErr("lastname", "Last name cannot be empty");
    }
    if (this.state.email === "") {
      valid = false;
      this.showValidationErr("email", "Email cannot be empty");
    }
    else
    {
      let emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if(emailValid === null)
      {
        valid = false;
        this.showValidationErr("email", "Invalid Email id");
      }
    }
    if (this.state.password === "") {
      valid = false;
      this.showValidationErr("password", "Password cannot be empty");
    }
    if (this.state.password !== this.state.confirmpassword) {
      valid = false;
      this.showValidationErr("password", "Password and Confirm Password dont match");
    }
    if (this.state.confirmpassword === "") {
      valid = false;
      this.showValidationErr("confirmpassword", "Confirm Password cannot be empty");
    }
    if (this.state.terms === "" || this.state.terms === false) {
      valid = false;
      this.showValidationErr("terms", "Accept the Terms of the application");
    }

    if(valid===true)
    {
      this.handleInsert();
    }
  }

  handleInsert() {
    console.log(this.state);
    //TODO : Fire the POST API, once created
  }


  render() {
    let emailErr = null,
      passwordErr = null,
      confirmpasswordErr = null,
    firstNameErr = null,
    lastNameErr = null,
    termsErr = null;


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
      if (err.elm === "firstname") {
        firstNameErr = err.msg;
      }
      if (err.elm === "lastname") {
        lastNameErr = err.msg;
      }
      if (err.elm === "terms") {
        termsErr = err.msg;
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
            <small className="danger-error">
              {firstNameErr ? firstNameErr : ""}
            </small>
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
            <small className="danger-error">
              {lastNameErr ? lastNameErr : ""}
            </small>
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

          <div className="terms-checkbox">
          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                id="terms"
                defaultChecked={this.props.defaultChecked}
                onChange={this.onTermsChange.bind(this)}
                value="termsAccepted"
                style={{ color: "#1cbfec" }}
              />
            }
            label="I agree to the terms of Unicorn Charity Club"
          />
          <br/>
          <small className="danger-error">
              {termsErr ? termsErr : ""}
            </small>
          </div>
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
export default RegisterForm;