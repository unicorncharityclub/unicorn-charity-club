import React from "react";
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