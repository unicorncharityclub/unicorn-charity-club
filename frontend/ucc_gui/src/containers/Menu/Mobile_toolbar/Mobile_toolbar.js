import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Arrow_backward from "../../../image/arrow-backward.png";
import Navbar from "../../Navbar/Navbar";
/** @import CSS styles */
import "./Mobile_toolbar.css";
import {connect} from "react-redux";
import cookie from "react-cookies";

/**
 * @description Creates the a menu toolbar for mobile version
 * @class Mobile_toolbar
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

  logout() {
      let user_id = "";
      let token = "";
      cookie.save('user_id', user_id);
      cookie.save('token', token);
      this.props.dispatch({ type: "LOGOUT_SUCCESS", user_id:user_id, token:token});
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

                        <a href="/MyChildren">My Children</a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/Payment" >
                            Payment
                        </a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/Terms_and_Conditions" >
                            Terms_and_Conditions
                        </a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/Security_and_Privacy" >
                            Security_and_Privacy
                        </a>
                      </div>

                      <div className="mobile-toolbar-menu__item">
                        <a href="/" onClick={this.logout} className="logout-link">
                          Logout
                        </a>
                      </div>
                </div>
            <Navbar />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(Mobile_toolbar);
