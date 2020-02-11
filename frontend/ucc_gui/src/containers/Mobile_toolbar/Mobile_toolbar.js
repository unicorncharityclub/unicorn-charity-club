/** @import modules
 * 'npm i --save react'
 * 'npm i --save react-router-dom'
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Arrow_forward from "../../image/arrow-forward.png";
import Arrow_backward from "../../image/arrow-backward.png";
import Account from "../Account/Account";
import MyChildren from "../MyChildren/MyChildren";
import Payment from "../Payment/Payment";
import Navbar from "../Navbar/Navbar";
/** @import CSS styles */
import "./Mobile_toolbar.css";

/**
 * @description Creates the a menu toolbar for mobile version
 * @class Mobile_toolbar
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {Mobile_toolbar}
 * @example <Mobile_toolbar />
 * pre-condition: all the imports
 * post-condition: returns the menu page for mobile version
 * @param null
 * @returns {Mobile_toolbar}
 */

class Mobile_toolbar extends Component {
  super() {
    this.state = { isMenuOpen: true };
  }

  closeMenu() {
    this.setState = { isMenuOpen: false };
  }
  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="mobile-toolbar-menu" style={{ display: "block" }}>
            <div className="header__logo-wrapper">
              <div className="header__logo">
                <div className="header-menu-mobile">
                  <a href="/">
                    <img src={Arrow_backward} alt="Backward Arrow" />
                  </a>
                </div>
              </div>
              <div className="header-title">Menu</div>
            </div>

            <div className="mobile-toolbar-menu__content">
              <div className="mobile-toolbar-menu__item">
                {/* <a href="/Menu/Account">My Account</a> */}
                <NavLink to={"/Menu/Account"} onClick={() => this.closeMenu()}>
                  My Account
                </NavLink>
              </div>

              <div className="mobile-toolbar-menu__item">
                {/* <a href="/">My Children</a> */}
                <NavLink to={"/Menu/MyChildren"}>My Children</NavLink>
              </div>

              <div className="mobile-toolbar-menu__item">
                <NavLink to={"/Menu/Payment"}>
                  Payment
                  {/* <a href="/">Payments</a> */}
                  <a href="/Menu/Payments">
                    <img
                      src={Arrow_forward}
                      className="return-button"
                      alt="Forward Arrow"
                    />
                  </a>
                </NavLink>
              </div>
              <div className="mobile-toolbar-menu__item">
                <NavLink to={"/Menu/Terms_and_Conditions"}>
                  Terms and Conditions
                  <a href="/Menu/Terms and Conditions">
                    <img
                      src={Arrow_forward}
                      className="return-button"
                      alt="Forward Arrow"
                    />
                  </a>
                </NavLink>
              </div>
              <div className="mobile-toolbar-menu__item">
                <NavLink to={"/Menu/Security_and_Privacy"}>
                  Security and Privacy
                  <a href="/Menu/Security and Privacy">
                    <img
                      src={Arrow_forward}
                      className="return-button"
                      alt="Forward Arrow"
                    />
                  </a>
                </NavLink>
              </div>
              <div className="mobile-toolbar-menu__item">
                <a href="/" className="logout-link">
                  Logout
                </a>
                <a href="/Logout">
                  <img
                    src={Arrow_forward}
                    className="return-button"
                    alt="Forward Arrow"
                  />
                </a>
              </div>
            </div>
            <Navbar />
            {/* <Switch> */}
            <Route path="/Menu/Account" exact component={Account} />
            <Route path="/Menu/MyChildren" exact component={MyChildren} />
            <Route path="/Menu/Payment" exact component={Payment} />
            {/* </Switch> */}

          </div>
        </div>
      </Router>
    );
  }
}

export default Mobile_toolbar;
