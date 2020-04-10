import React from "react";
import { NavLink } from "react-router-dom";
import Settings from "./Desktop/Settings";
import MobileLogo from "../../../image/Logo-mobile.png";
import DesktopLogo from "../../../site_media/Logo_Horizontal_No_Tagline.png";
import MobileMenuIcon from "../../../site_media/Images/mobile_menu_icon.png";
import Toolbar from "./Desktop/Toolbar";
import ArrowForward from "../../../image/arrow-forward.png";
import cookie from "react-cookies";
import UploadPhoto from "../../../site_media/Images/Default-profile-picture.png";
import "./Header.css";

class Header extends React.Component {

 constructor(props) {
     super(props);
     this.userList = cookie.load('user_list');
     this.userEmail = cookie.load('user_email');
     this.state = {email: "", fullName: "", profilePic: ""};
     for (let i in this.userList) {
         if (this.userList[i].email === this.userEmail) {
             this.state["email"] = this.userList[i].email;
             this.state["fullName"] = this.userList[i].full_name;
             this.state["profilePic"] = this.userList[i].profile_pic;
         }
     }
 }

 onUpdateUser()
 {
     window.location.reload(false);
 }

  render() {
    return (
        <header className="header">
          <div className="header__mobile-child-select">
            <div className="child-select__item">
              {this.state.profilePic !== '' ? (
                            <div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${this.state.profilePic})`}}
                                alt={this.state.fullName}
                            />
                        ) :
                        (<div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${UploadPhoto})`}}
                                alt={this.state.fullName}
                            />)
                    }
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
                src={MobileLogo}
                className="header__logo-mobile"
                alt="Unicorn Charity Club"
              />
            </a>
          </div>

          <div className="header__toolbar logged-in">
            <div className="header__child-select">
              <div className="child-select__item--main">
                <div className="child-select__item">

                    {this.state.profilePic !== '' ? (
                            <div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${this.state.profilePic})`}}
                                alt={this.state.fullName}
                            />
                        ) :
                        (<div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${UploadPhoto})`}}
                                alt={this.state.fullName}
                            />)
                    }
                  <div className="child-select__info">
                    <div className="child-select__name">
                      {this.state.fullName}<span className="dropdown-icon"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="child-select__dropdown-menu">
                <div className="child-select__header">
                  <div className="header">
                    <div className="header__logo">
                      <a href="/">
                        <img
                          src={DesktopLogo}
                          className="header__logo-desktop"
                          alt="Unicorn Charity Club"
                        />
                        <img
                          src={MobileLogo}
                          className="header__logo-mobile logo-popup"
                          alt="Unicorn Charity Club"
                        />
                      </a>

                      <div className="header-menu-mobile">
                        <img
                          className="return-button"
                          src={ArrowForward}
                          alt="Forward Arrow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="child-select-title-mobile">
                  Who wants to play and learn?
                </div>

                <Toolbar onUpdateUser={this.onUpdateUser.bind(this)}/>
              </div>
            </div>
            <Settings />
          </div>


          <NavLink to={"/Mobile_toolbar"}>
            <div className="header__mobile-toolbar">
              <img src={MobileMenuIcon} alt="Mobile Menu Icon" />
            </div>
          </NavLink>
        </header>
    );
  }
}


export default (Header);
