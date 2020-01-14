/** @import modules
 * 'npm i --save react'
 */
import React, { Component } from "react";
/** @import CSS styles */
import "./NotifBar.css";

/**
 * @description Creates the Notification center with calender and messages
 * @class NotifBar
 * @extends React.Component
 * @type {NotifBar}
 * @example <NotifBar />
 * pre-condition: all the imports
 * post-condition: returns the notification centre with calender and messages
 * @param null
 * @returns {NotifBar}
 * @todo connect to database
 */
class NotifBar extends Component {
  render() {
    return (
      <div className="Tool-guide">
        <div className="content_holder">
          <a href="/calender">
            <div className="Calender"></div>
            <div className="Text">Calendar</div>
          </a>
          <a href="/Notification">
            <div className="Notification"></div>
            <div className="Text">Notifications</div>
          </a>
          <a href="/Messages">
            <div className="Messages"></div>
            <div className="Text">Messages</div>
          </a>
        </div>
      </div>
    );
  }
}

export default NotifBar;
