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
import BaseRouter from "../../routes";
import Payment from "../Payment/Payment";
import Terms_and_Conditions from "../Terms_and_Conditions/Terms_and_Conditions";
import Security_and_Privacy from "../Security_and_Privacy/Security_and_Privacy";
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
                            <a href="/">
                                <img src={Arrow_backward} alt="Backward Arrow" />
                              </a>
                            <div className="header-menu-mobile">
                            </div>
                      </div>
                      <div className="header-title">Menu</div>
                </div>

                <div className="mobile-toolbar-menu__content">
                      <div className="mobile-toolbar-menu__item">
                        <a href="/Account">
                            My Account
                        </a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        {/* <a href="/">My Children</a> */}
                        <a href="/MyChildren">My Children</a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/Menu/Payment" >
                            Payment
                        </a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/Menu/Terms_and_Conditions" >
                            Terms_and_Conditions
                        </a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/Menu/Security_and_Privacy" >
                            Security_and_Privacy
                        </a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/" className="logout-link">
                          Logout
                        </a>
                      </div>
                </div>
            <Navbar />
            {/* <Switch> */}
            <Route path="/Menu/Account" exact component={Account} />
            <Route path="/Menu/MyChildren" exact component={MyChildren} />
            {/* </Switch> */}

          </div>
        </div>
      </Router>
    );
  }
}

export default Mobile_toolbar;
