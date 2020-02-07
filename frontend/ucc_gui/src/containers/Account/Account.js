/** @import modules
 * 'npm i --save react'
 * 'npm i --save react-router-dom'
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Arrow_backward from "../../image/arrow-backward.png";
//import Mobile_toolbar from "../Mobile_toolbar/Mobile_toolbar";
import Settings_camera from "../../site_media/Images/Settings_Camera.png";
import Settings_email from "../../site_media/Images/Settings_Email.png";
import Settings_home from "../../site_media/Images/Settings_Address.png";
import Settings_mobile from "../../site_media/Images/Settings_Mobile.png";
import Settings_notifications from "../../site_media/Images/Settings_Notifications.png";
/** @import CSS styles */
import "./Account.css";

/**
 * @description Creates the My Account page for the user
 * @class Account
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {Account}
 * @example <Account />
 * pre-condition: all the imports
 * post-condition: returns the Account page
 * @param null
 * @returns {Account}
 * @todo connect to database for individual user
 */
class Account extends React.Component {

    state = {
        account : []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/myaccount/')
            .then(res => {
                    this.setState({
                        account: res.data[0]
                    });
                console.log(res.data[0])
            })
    }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="content">
            <div className="menu" style={{ display: "block" }}>
              <div className="header__wrapper">
                <div className="header__logo">
                  <div className="header-menu-mobile">
                    <NavLink to={"/"}>
                      <a href="/">
                        <img src={Arrow_backward} alt="Backward Arrow" />
                      </a>
                    </NavLink>
                  </div>
                </div>
                <div className="header-title">
                  My Account
                  <div className="header-link">Save</div>
                </div>
              </div>
              <div className="menu__content">
                <div className="menu__item_title">
                  {/* <a href="/"> Name</a> */}
                  <textarea placeholder="Name" value={this.state.account.Name}>Name</textarea>
                  <img src={Settings_camera} alt="Settings_camera" />
                </div>
                <div className="menu__item" style={{ paddingBottom: "0px" }}>
                  <img src={Settings_home} alt="Settings_home" />
                  {/* <a href="/"> Address</a> */}
                  <textarea placeholder="Address" value={this.state.account.Address}>Address</textarea>
                </div>
                <div className="menu__item" style={{ paddingBottom: "0px" }}>
                  <img src={Settings_email} alt="Settings_email" />
                  {/* <a href="/"> Email</a> */}
                  <textarea placeholder="Email" value={this.state.account.Email}>Email</textarea>
                </div>
                <div className="menu__item" style={{ paddingBottom: "0px" }}>
                  <img
                    src={Settings_mobile}
                    alt="Settings_mobile"
                    style={{ width: "27px", paddingRight: "10px" }}
                  />
                  {/* <a href="/"> Mobile</a> */}
                  <textarea placeholder="Mobile" value={this.state.account.Mobile}>Mobile</textarea>
                </div>
                <div className="menu__item" style={{ paddingBottom: "0px" }}>
                  <img
                    src={Settings_notifications}
                    alt="Settings_notifications"
                  />
                  {/* <a href="/"> Notifications</a> */}
                  <textarea placeholder="Notifications">Notifications</textarea>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Account;
