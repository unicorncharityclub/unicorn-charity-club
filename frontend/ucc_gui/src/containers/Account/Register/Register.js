import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import "./Register.css";
import TextTheme from "../../../components/General/Text/TextTheme";

class Register extends React.Component {
  render() {
    return (
      <Router>
          <div>
            <div className="title">
              <TextTheme message="Let's get you registered with Unicron Charity Club!!" className="text_large text_white"/>
            </div>
            <RegisterForm />
          </div>
      </Router>
    );
  }
}
export default Register;

