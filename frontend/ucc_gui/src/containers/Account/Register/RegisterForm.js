import React from "react";
import AxiosConfig from '../../../axiosConfig'
import { Checkbox, FormControlLabel } from "@material-ui/core";
import AlertMessage from "../../../components/General/AlertMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
      dob: "",
      status: "",
      errors: []
    };
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
      return { errors: newArr, status : "" };
    });
  }

  onFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
    this.clearValidationErr("firstName");
  }

  onLastNameChange(e) {
    this.setState({ lastName: e.target.value });
    this.clearValidationErr("lastName");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onDobChange(e) {
    this.setState({ dob: e.target.value });
    this.clearValidationErr("dob");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
  }

  onConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
    this.clearValidationErr("confirmPassword");
  }

  onTermsChange(e) {
    this.setState({ terms: e.target.checked });
    this.clearValidationErr("terms");
  }

  submitRegister(e) {
    e.preventDefault();
    let valid = true;
    if (this.state.firstName === "") {
      valid = false;
      this.showValidationErr("firstName", "First name cannot be empty");
    }
    if (this.state.lastName === "") {
      valid = false;
      this.showValidationErr("lastName", "Last name cannot be empty");
    }
    if (this.state.dob === "") {
      valid = false;
      this.showValidationErr("dob", "Date of Birth cannot be empty");
    } else {
      if (this.state.dob > getCurrentDate()) {
        valid = false;
        this.showValidationErr("dob", "Invalid Date of Birth");
      }
    }
    if (this.state.email === "") {
      valid = false;
      this.showValidationErr("email", "Email cannot be empty");
    } else {
      let emailValid = this.state.email.match(
        /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
      );
      if (emailValid === null) {
        valid = false;
        this.showValidationErr("email", "Invalid Email id");
      }
    }
    if (this.state.password === "" || this.state.password.length < 6) {
      valid = false;
      this.showValidationErr(
        "password",
        "Password should have minimum 6 characters"
      );
    }
    if (this.state.password !== this.state.confirmPassword) {
      valid = false;
      this.showValidationErr(
        "password",
        "Password and Confirm Password dont match"
      );
    }
    if (this.state.confirmPassword === "") {
      valid = false;
      this.showValidationErr(
        "confirmPassword",
        "Confirm Password cannot be empty"
      );
    }
    if (this.state.terms === "" || this.state.terms === false) {
      valid = false;
      this.showValidationErr("terms", "Accept the Terms of the application");
    }

    if (valid === true) {
      this.handleInsert(this);
    }
  }

  updateResponseStatus(data) {
    if (data === "Success") {
      data = "User successfully registered. Proceed to Login.";
    }
    this.setState(prevState => ({
      status: data
    }));
  }

  handleInsert(obj, event) {
    var status = "";
    AxiosConfig
      .post(`account/register`, {
        'first_name' : this.state.firstName,
        'last_name' : this.state.lastName,
        'email' : this.state.email,
        'password' : this.state.password,
        'dob' : this.state.dob,
      })
      .then(function(response) {
        status = response.data["status"];
        obj.updateResponseStatus(status);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let emailErr = null,
      passwordErr = null,
      confirmPasswordErr = null,
      firstNameErr = null,
      lastNameErr = null,
      termsErr = null,
      dobErr = null;

    for (let err of this.state.errors) {
      if (err.elm === "email") {
        emailErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if (err.elm === "confirmPassword") {
        confirmPasswordErr = err.msg;
      }
      if (err.elm === "firstName") {
        firstNameErr = err.msg;
      }
      if (err.elm === "lastName") {
        lastNameErr = err.msg;
      }
      if (err.elm === "terms") {
        termsErr = err.msg;
      }
      if (err.elm === "dob") {
        dobErr = err.msg;
      }
    }
    return (
      <div className="register-form-div">
        <form
          className="register-form"
          name="form"
          onSubmit={this.submitRegister}
        >
          <div className="form-content">
            <Row>
              <Col md={{ span: 5, offset: 5}}>
                <AlertMessage alertMessage={this.state.status} />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>
                <div className="form-item">
                  <label>First name:</label>
                  <input
                    name="firstName"
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    value={this.state.value}
                    onChange={this.onFirstNameChange.bind(this)}
                  />
                  <small className="danger-error">
                    {firstNameErr ? firstNameErr : ""}
                  </small>
                </div>
              </Col>

              <Col md={{ span: 4, offset: 2 }}>
                <div className="form-item">
                  <label>Last name:</label>
                  <input
                    name="lastName"
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={this.state.value}
                    onChange={this.onLastNameChange.bind(this)}
                  />
                  <small className="danger-error">
                    {lastNameErr ? lastNameErr : ""}
                  </small>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>
                <div className="form-item">
                  <label>Email:</label>
                  <input
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={this.state.value}
                    onChange={this.onEmailChange.bind(this)}
                  />
                  <small className="danger-error">
                    {emailErr ? emailErr : ""}
                  </small>
                </div>
              </Col>

              <Col md={{ span: 4, offset: 2 }}>
                <div className="form-item">
                  <label>Date of Birth:</label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    value={this.state.dob}
                    onChange={this.onDobChange.bind(this)}
                  />
                </div>
                <small className="danger-error">{dobErr ? dobErr : ""}</small>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>
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
              </Col>

              <Col md={{ span: 4, offset: 2 }}>
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
                    {confirmPasswordErr ? confirmPasswordErr : ""}
                  </small>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 6, offset: 4 }}>
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
                  <br />
                  <small className="danger-error">
                    {termsErr ? termsErr : ""}
                  </small>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <button
                  id="button"
                  className="register-btn"
                  type="submit"
                  onClick={this.submitRegister.bind(this)}
                >
                  Register
                </button>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <a href="/">
                  Already Registered? Continue to Login.
                </a>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
