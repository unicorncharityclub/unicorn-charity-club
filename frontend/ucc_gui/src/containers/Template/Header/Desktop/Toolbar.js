import React, { Component } from "react";
import Add_child from "../../../../image/add-child-button-mobile.png";
import "../Header.css";
import "./Toolbar.css";
import cookie from "react-cookies";
import Upload_photo from "../../../../site_media/Images/Default-profile-picture.png";
import {connect} from "react-redux";

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
     this.user_list = cookie.load('user_list');
     this.user_emailid = cookie.load('user_emailid');
     this.state = {other_users: ""};
     for (let i in this.user_list) {
         if (this.user_list[i].email !== this.user_emailid) {
             this.state["other_users"] = [...this.state.other_users, this.user_list[i]]
         }
     }

 }

 onUpdateUser(emailid)
 {
     cookie.save('user_emailid', emailid);
     this.props.onUpdateUser();
 }

  render() {
    return (
        <div className="child-select__dropdown-menu-wrapper">
        {this.state.other_users
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
                                style={{backgroundImage: `url(${Upload_photo})`}}
                                alt={elem.name}
                            />)
                    }
              <div className="child-select__info">
                <div className="child-select__name">{elem.name}</div>
              </div>
            </div>
          </a>
          ))}


          <a
            className="child-select__item child-select__item--dropdown child-select__item--add-child"
            href="/AddChild"
          >
            <div className="child-select__name child-select__name--add-child">
              <span className="add-child-web">Add new child</span>
              <span className="add-child-mobile">
                <img src={Add_child} />
              </span>
            </div>
          </a>
        </div>
    );
  }
}

export default Toolbar;