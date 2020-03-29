import React, { Component } from "react";
import AddChild from "../../../../image/add-child-button-mobile.png";
import "../Header.css";
import "./Toolbar.css";
import cookie from "react-cookies";
import UploadPhoto from "../../../../site_media/Images/Default-profile-picture.png";

/**
 * @description Creates the toolbar section in the header with
 * list of kids and settings icon
 * @class Toolbar
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {Toolbar}
 * @example <Toolbar />
 * pre-condition: all the imports
 * post-condition: returns the a dropdown of kids under that account
 * and settings icon
 * @param null
 * @returns {Toolbar}
 * @todo connect to database to get all the kids under that account
 */
class Toolbar extends Component {

    constructor(props) {
     super(props);
     this.userList = cookie.load('user_list');
     this.userEmail = cookie.load('user_email');
     this.state = {otherUsers: ""};
     for (let i in this.userList) {
         if (this.userList[i].email !== this.userEmail) {
             this.state["otherUsers"] = [...this.state.otherUsers, this.userList[i]]
         }
     }
 }

 onUpdateUser(email)
 {
     cookie.save('user_email', email);
     this.props.onUpdateUser();
 }

  render() {
    return (
        <div className="child-select__dropdown-menu-wrapper">

        {
            this.state.otherUsers !== '' ? (
                this.state.otherUsers
          .map(elem => (
          <a
              key={elem.email}
            className="child-select__item child-select__item--dropdown "
            onClick={this.onUpdateUser.bind(this, elem.email)}
          >
            <div className="child-select__profile">
              {elem.photo !== '' ? (
                            <div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${elem.photo})`}}
                                alt={elem.name}
                            />
                        ) :
                        (<div
                                className="child-select__avatar"
                                style={{backgroundImage: `url(${UploadPhoto})`}}
                                alt={elem.name}
                            />)
                    }
              <div className="child-select__info">
                <div className="child-select__name">{elem.name}</div>
              </div>
            </div>
          </a>
          ))
            ):('')

            }


          <a
            className="child-select__item child-select__item--dropdown child-select__item--add-child"
            href="/AddChild"
          >
            <div className="child-select__name child-select__name--add-child">
              <span className="add-child-web">Add new child</span>
              <span className="add-child-mobile">
                <img src={AddChild} />
              </span>
            </div>
          </a>
        </div>
    );
  }
}

export default Toolbar;