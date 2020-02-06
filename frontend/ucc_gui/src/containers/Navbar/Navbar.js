import React, { Component } from "react";
import { NavLink } from "react-router-dom";
/** @import CSS styles */
import "./Navbar.css";

/**
 * @description Creates a navigatin bar to switch between pages
 * @class Navbar
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {Navbar}
 * @example <Navbar />
 * pre-condition: all the imports
 * post-condition: returns a navigation bar
 * @param null
 * @returns {Navbar}
 */
class Navbar extends React.Component {
  render() {
    return (
      <nav className="header__nav" role="navigation">
        <ul className="nav__list">
          <NavLink
            activeClassName="nav__item--active"
            className="nav__link nav__item"
            to={"/Projects"}
          >
            {" "}
            <div className="nav__icon--projects"></div>
            <div className="nav__label">Projects</div>
          </NavLink>

          <NavLink
            activeClassName="nav__item--active"
            className="nav__link nav__item"
            to={"/Spotlight"}
          >
            {" "}
            <div className="nav__icon--spotlight"></div>
            <div className="nav__label">Spotlight</div>
          </NavLink>

          <NavLink
            exact
            activeClassName="nav__item--active"
            className="nav__link nav__item"
            to={"/"}
          >
            {" "}
            <div className="nav__icon--homepage"></div>
            <div className="nav__label"> </div>
          </NavLink>

          <NavLink
            activeClassName="nav__item--active"
            className="nav__link nav__item"
            to={"/Friends"}
          >
            {" "}
            <div className="nav__icon--friends"></div>
            <div className="nav__label">Friends</div>
          </NavLink>

          <NavLink
            activeClassName="nav__item--active"
            className="nav__link nav__item"
            to={"/Yearbook"}
          >
            {" "}
            <div className="nav__icon--yearbook"></div>
            <div className="nav__label">Yearbook</div>
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
