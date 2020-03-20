import React from "react";
import { NavLink } from "react-router-dom";
import Settings from "./Desktop/Settings";
import Mobile_logo from "../../../image/Logo-mobile.png";
import DesktopLogo from "../../../site_media/Logo_Horizontal_No_Tagline.png";
import Mobile_menu_icon from "../../../site_media/Images/mobile_menu_icon.png";
import Toolbar from "./Desktop/Toolbar";
import Arrow_forward from "../../../image/arrow-forward.png";
import cookie from "react-cookies";
import Upload_photo from "../../../site_media/Images/Default-profile-picture.png";
import "./Header.css";


class Header extends React.Component {

 constructor(props) {
     super(props);
     this.user_list = cookie.load('user_list');
     this.user_emailid = cookie.load('user_emailid');
     this.state = {email: "", name: "", photo: ""};
     for (let i in this.user_list) {
         if (this.user_list[i].email === this.user_emailid) {
             this.state["email"] = this.user_list[i].email;
             this.state["name"] = this.user_list[i].name;
             this.state["photo"] = this.user_list[i].photo;
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
              {this.state.photo !== '' ? (
                            <div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${this.state.photo})`}}
                                alt={this.state.name}
                            />
                        ) :
                        (<div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${Upload_photo})`}}
                                alt={this.state.name}
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
                src={Mobile_logo}
                className="header__logo-mobile"
                alt="Unicorn Charity Club"
              />
            </a>
          </div>

          <div className="header__toolbar logged-in">
            <div className="header__child-select">
              <div className="child-select__item--main">
                <div className="child-select__item">

                    {this.state.photo !== '' ? (
                            <div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${this.state.photo})`}}
                                alt={this.state.name}
                            />
                        ) :
                        (<div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${Upload_photo})`}}
                                alt={this.state.name}
                            />)
                    }
                  <div className="child-select__info">
                    <div className="child-select__name">
                      {this.state.name}<span className="dropdown-icon"/>
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
                          src={Mobile_logo}
                          className="header__logo-mobile logo-popup"
                          alt="Unicorn Charity Club"
                        />
                      </a>

                      <div className="header-menu-mobile">
                        <img
                          className="return-button"
                          src={Arrow_forward}
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
              <img src={Mobile_menu_icon} alt="Mobile Menu Icon" />
            </div>
          </NavLink>
        </header>
    );
  }
}


export default (Header);
