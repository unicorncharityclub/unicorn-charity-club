/** @import modules
 * 'npm i --save react'
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/**
 * @description Displays Security and Privacy text
 * @class Security_and_Privacy
 * @extends React.Component
 * @type {Text}
 * @example <Security_and_Privacy />
 * pre-condition: all the imports
 * post-condition: returns the Security and Privacy text
 * @returns {Security_and_Privacy}
 * @todo insert the required text
 */
class Security_and_Privacy extends React.Component {
  render() {
    return (
        <div>
            <p> Security and Privacy Page </p>
        </div>
    );
  }
}

export default Security_and_Privacy;
