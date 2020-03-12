import React from "react";
import { NavLink } from "react-router-dom";
import Arrow_backward from "../../image/arrow-backward.png";
import Settings_email from "../../site_media/Images/Settings_Email.png";
import Settings_home from "../../site_media/Images/Settings_Address.png";
import Settings_mobile from "../../site_media/Images/Settings_Mobile.png";
import Settings_notifications from "../../site_media/Images/Settings_Notifications.png";
import Upload_photo from "../../image/Default-profile-picture.png";
import cookie from 'react-cookies'
import axiosConfig from '../../axiosConfig'

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
    user_emailid;

    componentDidMount() {
        const user_emailid = cookie.load('user_emailid');
        console.log(user_emailid);
        axiosConfig.get(`myaccount/${user_emailid}`)
            .then(res => {
                    this.setState({
                        Name: res.data.name,
                        Email: res.data.email,
                        Mobile: res.data.mobile,
                        Address: res.data.address,
                        ProfilePic: res.data.profilepic,                        
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
        console.log(this.state.FinalImage);
    }

    handleSaveBtn = (event) => {
        event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append('Name', this.state.Name);
            form_data.append('Address', this.state.Address);
            form_data.append('Mobile', this.state.Mobile);
            form_data.append('Email', this.state.Email);

            if (this.state.FinalImage){
              form_data.append('ProfilePic', this.state.FinalImage, this.state.FinalImage.name);
            }
            
        } catch(err) {
            console.log(err)
        }

        const account_emailid =  cookie.load('user_emailid');
        axiosConfig.defaults.withCredentials = true;
        axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        return axiosConfig.put(`myaccount/${account_emailid}/`, form_data,
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
                        {/* {this.state.ProfilePic} */}
                            {/* <Avatar className = "profilepic" src={this.state.ProfilePic}/>
                            <label className="upload-photo" htmlFor="file">Upload Photo</label>
                            <input type="file" name="ProfilePic" style={{display: 'none'}}  onChange={this.imageHandler.bind(this)}/> */}


                            <img className="profile-picture" src={this.state.Photo || Upload_photo} alt=""/>
                            <label className="upload-photo" htmlFor="file">Upload Photo</label>
                                <input id="file" style={{display: 'none'}}
                                          type="file"
                                          name="Photo"
                                          accept=".png, .jpeg, .jpg"
                                          onChange={this.imageHandler.bind(this)}
                                />
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
                          <textarea readOnly name="Email" placeholder="Email" value={this.state.Email} onChange={this.handleChange.bind(this)}>Email</textarea>
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
