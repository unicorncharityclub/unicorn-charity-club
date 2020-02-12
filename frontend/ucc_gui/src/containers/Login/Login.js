import React, { Component } from "react";
import Logo from "../../site_media/Logo_Horizontal_No_Tagline.png";
import LoginForm from "./Login_Form";
import "./Login.css";

class Login extends React.Component {
  render() {
    return (
      <section className="login">
          <div className="login-box__title">Log In</div>
          <div className="login-box__content">
            <LoginForm />
          </div>
      </section>
    );
  }
}

export default Login;