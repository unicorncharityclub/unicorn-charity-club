/** @import modules
 * 'npm i --save react'
 * 'npm i --save react-router-dom'
 * 'npm i --save firebase'
 */
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Setting_icon from "../../image/settings.png";
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
      <div className="header__settings">
        <div className="setting-icon">
          <img src={Setting_icon} alt="settings" />

          <div className="settings-dropdown">
              <a href="/account" >
                <div className="settings-dropdown__item">My&nbsp;Account</div>
              </a>
            <a href="/" onClick={this.logout} className="logout-link">
              <div className="settings-dropdown__item">Logout</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
