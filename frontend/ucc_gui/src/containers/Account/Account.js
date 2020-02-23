/** @import modules
 * 'npm i --save react'
 * 'npm i --save react-router-dom'
 */
import React from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Arrow_backward from "../../image/arrow-backward.png";
//import Mobile_toolbar from "../Mobile_toolbar/Mobile_toolbar";
import Settings_camera from "../../site_media/Images/Settings_Camera.png";
import Settings_email from "../../site_media/Images/Settings_Email.png";
import Settings_home from "../../site_media/Images/Settings_Address.png";
import Settings_mobile from "../../site_media/Images/Settings_Mobile.png";
import Settings_notifications from "../../site_media/Images/Settings_Notifications.png";
import cookie from 'react-cookies'
//import Avatar from 'react-avatar';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
        Address : '',
        ProfilePic : '',
        FinalImage : ''
    }
    user_id;

    componentDidMount() {
        const user_id = cookie.load('user_id');
        console.log(user_id)
        // hardcoding for now. .
        axios.get(`http://127.0.0.1:8000/myaccount/${user_id}`)
            .then(res => {
                    this.setState({
                        Name: res.data.name,
                        Email: res.data.email,
                        Mobile: res.data.mobile,
                        Address: res.data.address,
                        ProfilePic: res.data.profilepic
                    });


                console.log(res.data)
            }).catch(error => console.log(error))
    }

    handleChange(event) {
      this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    imageHandler(event){
        this.setState({
            ProfilePic: URL.createObjectURL(event.target.files[0]),
            FinalImage : event.target.files[0]
        })
        console.log(event.target.files[0])
    }

    handleSaveBtn = (event) => {
        event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append('Name', this.state.Name);
            form_data.append('Address', this.state.Address);
            form_data.append('Mobile', this.state.Mobile);
            form_data.append('Email', this.state.Email);
            form_data.append('ProfilePic', this.state.FinalImage, this.state.FinalImage.name);
        } catch(err) {
            console.log(err)
        }
        console.log(form_data);
//        const Name = event.target.elements.Name.value;
//        const Address = event.target.elements.Address.value;
//        const Mobile = event.target.elements.Mobile.value;
//        const Email = event.target.elements.Email.value;
//        const ProfilePic = this.state.FinalImage;

//        console.log(event.target.elements);
//        console.log("pp: " + this.state.ProfilePic);
        const account_id =  cookie.load('user_id');
        const token = cookie.load('XSRF-TOKEN');
        console.log(token)
        axios.defaults.withCredentials = true;
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
//        axios.put(`http://127.0.0.1:8000/myaccount/${account_id}`, {
//                 Name: Name,
//                Email: Email,
//                Mobile: Mobile,
//                Address: Address,
//                ProfilePic : ProfilePic
//        },{
//                        headers: {
//                            'content-type': 'multipart/form-data'
//                        }
//                    }
//            )
//        .then(res => console.log(res))
//        .catch(error => console.log(error))

            axios.put(`http://127.0.0.1:8000/myaccount/${account_id}/`, form_data,
                    {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then(res => console.log(res))
                    .catch(error => console.log(error))


    };


  render() {
    return (
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
                        <div className="root_profilepic">
                        {this.state.ProfilePic}
                            <Avatar className = "profilepic" src={this.state.ProfilePic}/>
                            <input type="file" onChange={this.imageHandler.bind(this)}/>
                         </div>

                        <div className="menu__item_title">
                          {/* <a href="/"> Name</a> */}
                          <textarea name="Name" placeholder="Name" value={this.state.Name} onChange={this.handleChange.bind(this)}>Name</textarea>
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

    );
  }
}

export default Account;
