import React from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Settings from "../Menu/Settings/Settings";
import Mobile_toolbar from "../Menu/Mobile_toolbar/Mobile_toolbar";
import Mobile_logo from "../../../image/Logo-mobile.png";
import DesktopLogo from "../../../site_media/Logo_Horizontal_No_Tagline.png";
import Mobile_menu_icon from "../../../site_media/Images/mobile_menu_icon.png";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <Router>
        <header className="header">
          <div className="header__mobile-child-select">
            <div className="child-select__item">
              <div
                className="child-select__avatar child-select__avatar--mobile-header"
                // style={{background-image: url('../../image/birva.png')}}
                style={{ backgroundColor: "#ffaacc" }}
                alt="Gemma"
              ></div>
            </div>
          </div>
          <div className="header__logo main">
            <a href="/">
              <img
                src={DesktopLogo}
                className="header__logo-desktop"
                alt="Unicorn Charity Club"
              />
              <img
                src={Mobile_logo}
                className="header__logo-mobile"
                alt="Unicorn Charity Club"
              />
            </a>            
          </div>
          <Settings />
          <NavLink to={"/Mobile_toolbar"}>
            <div className="header__mobile-toolbar">
              <img src={Mobile_menu_icon} alt="Mobile Menu Icon" />
            </div>
          </NavLink>
        </header>
        <Route path="/Mobile_toolbar" exact component={Mobile_toolbar}>
          {/* <Mobile_toolbar /> */}
        </Route>
      </Router>
    );
  }
}
export default Header;
