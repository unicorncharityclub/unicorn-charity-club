import React from "react";
import LoginForm from "./Login_Form";
import "./Login.css";
import TextTheme from "../../../components/General/Text/TextTheme";

class Login extends React.Component {
  render() {
    return (
      <section className="login">
          <div className="login-box__title"><TextTheme message = "Log In" textAlign="center" className="text_large text_black"/></div>
            <LoginForm />
      </section>
    );
  }
}

export default Login;