
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import RegisterBannerImage from "../../components/Register/RegisterBannerImage";
import "./Register.css";

class Register extends React.Component {
  render() {
    return (
      <Router>
        <RegisterBannerImage/>
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

