/** @import modules
 * 'npm i --save react'
 * 'npm i --save react-router-dom'
 * 'npm i --save firebase'
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import Setting_icon from "../../image/settings.png";
import BaseRouter from "../../routes";
import Account from "../Account/Account";
import MyChildren from "../MyChildren/MyChildren";
import Payment from "../Payment/Payment";
import Terms_and_Conditions from "../Terms_and_Conditions/Terms_and_Conditions";
import Security_and_Privacy from "../Security_and_Privacy/Security_and_Privacy";
import Navbar from "../Navbar/Navbar";
/** @import CSS styles */
import "./Settings.css";

/**
 * @description Creates the Settings menu page for the user
 * @class Settings
 * @extends React.Component
 * @type {Settings}
 * @example <Settings />
 * pre-condition: all the imports
 * post-condition: returns the settings menu page
 * @param null
 * @returns {Settings}
 * @todo connect to database
 */
/**
 * @function constructor
 * @param {props} props
 * @returns {props}
 */
/**
 * @function logout
 * @param null
 * @returns {signOut}
 */
class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
//    firebaseapi.auth().signOut();
  }
  render() {
    return (
    <Router>
      <div className="header__settings">
        <div className="setting-icon">
          <img src={Setting_icon} alt="settings" />

              <div className="settings-dropdown">
                  <a href="/Account" >
                        <div className="settings-dropdown__item">My&nbsp;Account</div>
                  </a>
                  <a href="/Menu/MyChildren" >
                        <div className="settings-dropdown__item">My&nbsp;Children</div>
                  </a>
                  <a href="/Menu/Payment" >
                        <div className="settings-dropdown__item">&nbsp;Payment</div>
                  </a>
                  <a href="/Menu/Terms_and_Conditions" >
                        <div className="settings-dropdown__item">Terms&nbsp;&&nbsp;Conditions</div>
                  </a>
                  <a href="/Menu/Security_and_Privacy" >
                        <div className="settings-dropdown__item">Security&nbsp;and&nbsp;Privacy</div>
                  </a>
                   <a href="/" onClick={this.logout} className="logout-link">
                        <div className="settings-dropdown__item">Logout</div>
                    </a>
              </div>

            <Route path="/Menu/Account" exact component={Account} />
            <Route path="/Menu/MyChildren" exact component={MyChildren} />
        </div>
      </div>
      </Router>
    );
  }
}

export default Settings;
