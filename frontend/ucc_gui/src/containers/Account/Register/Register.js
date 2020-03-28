import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import "./Register.css";

class Register extends React.Component {
  render() {
    return (
      <Router>
          <div>
            <div className="title">
              <span>Let's get you registered with Unicron Charity Club!!</span>
            </div>
            <RegisterForm />
          </div>
      </Router>
    );
  }
}
export default Register;

