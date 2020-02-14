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
        Name: '',
        Email : '',
        Mobile : '',
        Address : ''
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/myaccount/')
            .then(res => {
                    this.setState({
                        Name: res.data[0].Name,
                        Email: res.data[0].Email,
                        Mobile: res.data[0].Mobile,
                        Address: res.data[0].Address,
                    });
                console.log(res.data[0])
            }).catch(error => console.log(error))
    }

    handleChange(event) {
      this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }


    handleSaveBtn = (event) => {
        event.preventDefault();
        const Name = event.target.elements.Name.value;
        const Address = event.target.elements.Address.value;
        const Mobile = event.target.elements.Mobile.value;
        const Email = event.target.elements.Email.value;

        console.log(Name, Address, Mobile, Email);

        // hardcoding for now..
        const account_id = 1
        axios.put(`http://127.0.0.1:8000/myaccount/${account_id}/`, {
                 Name: Name,
                Email: Email,
                Mobile: Mobile,
                Address: Address
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }

  render() {
    return (
        <div className="container">
          <div className="content">
            <div style={{ display: "block" }}>
                <form onSubmit={this.handleSaveBtn}>
                      <div className="header__wrapper">
                        <div className="header__logo">
                            <NavLink to={"/"}>
                                <img src={Arrow_backward} alt="Backward Arrow" />
                            </NavLink>
                          <div className="header-menu-mobile">
                          </div>
                        </div>
                        <div className="header-title">
                          My Account
                          <div className="header-link">
                                <input type="submit" value="Save" />
                          </div>
                        </div>
                      </div>
                      <div className="menu__content">
                        <div className="menu__item_title">
                          {/* <a href="/"> Name</a> */}
                          <textarea name="Name" placeholder="Name" value={this.state.Name} onChange={this.handleChange.bind(this)}>Name</textarea>
                          <img src={Settings_camera} alt="Settings_camera" />
                        </div>
                        <div className="menu__item" style={{ paddingBottom: "0px" }}>
                          <img src={Settings_home} alt="Settings_home" />
                          {/* <a href="/"> Address</a> */}
                          <textarea name="Address" placeholder="Address" value={this.state.Address} onChange={this.handleChange.bind(this)}>Address</textarea>
                        </div>
                        <div className="menu__item" style={{ paddingBottom: "0px" }}>
                          <img src={Settings_email} alt="Settings_email" />
                          {/* <a href="/"> Email</a> */}
                          <textarea name="Email" placeholder="Email" value={this.state.Email} onChange={this.handleChange.bind(this)}>Email</textarea>
                        </div>
                        <div className="menu__item" style={{ paddingBottom: "0px" }}>
                          <img
                            src={Settings_mobile}
                            alt="Settings_mobile"
                            style={{ width: "27px", paddingRight: "10px" }}
                          />
                          {/* <a href="/"> Mobile</a> */}
                          <textarea name="Mobile" placeholder="Mobile" value={this.state.Mobile} onChange={this.handleChange.bind(this)}>Mobile</textarea>
                        </div>
                        <div className="menu__item" style={{ paddingBottom: "0px" }}>
                          <img
                            src={Settings_notifications}
                            alt="Settings_notifications"
                          />
                          {/* <a href="/"> Notifications</a> */}
                          <textarea placeholder="Notifications" defaultValue="Notifications" ></textarea>
                        </div>
                      </div>
                </form>

              {/* form ends here */}
            </div>
          </div>
        </div>
    );
  }
}

export default Account;
