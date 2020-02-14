import React, from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";
import Arrow_backward from "../../image/arrow-backward.png";
import Add_child from "../../site_media/Images/Add_Child.png";
import Child_avatar from "../../site_media/Images/Default_Avatar.png";
import { NavLink } from "react-router-dom";
import {List} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const Children= props => {
    return (
      <Router>
        <div className="menu" id="container" style={{ display: "block" }}>
          <div className="header__wrapper">
            <div className="header__logo">
              <div className="header-menu-mobile">
                <NavLink to={"/Menu"}>
                  <a href="/Menu">
                    <img src={Arrow_backward} alt="Backward Arrow" />
                  </a>
                </NavLink>
              </div>
            </div>
            <div className="header-title">My Children</div>
          </div>
          <div className="menu__content">
            <List className="childrenList"
                dataSource={props.data}
                renderItem={item => (
                  <List.Item
                    key={item.Name}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={Child_avatar} />}
                      Name={<a href={`/childaccount/${item.id}`}> {item.Name} </a>}
                    />
                  </List.Item>
                )}
              />
            <NavLink to={"/addChild"}>
              <div className="menu__item">
                <img src={Add_child} alt="add achild" />
                <a href="/"> Add Child</a>
              </div>
            </NavLink>
          </div>
        </div>
      </Router>
    );
};

export default Children;