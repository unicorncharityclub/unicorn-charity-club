import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";
import Arrow_backward from "../../image/arrow-backward.png";
import Add_child from "../../site_media/Images/Add_Child.png";
import Child_avatar from "../../site_media/Images/Default_Avatar.png";
import { NavLink } from "react-router-dom";
import {List} from "antd";
import AddChild from "./AddChild";

const Children= props => {
    return (
      <Router>
        <div style={{ display: "block" }}>
          <div className="header__wrapper">
            <div className="header__logo">
              <div className="header-menu-mobile">
                  <a href="/Menu">
                    <img src={Arrow_backward} alt="Backward Arrow" />
                  </a>
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
                   {<a href={`/MyChildren/${item.id}`}> {item.Name} </a>}
                  </List.Item>
                )}
              />
               </div>
        </div>
              <div className="addChild">
                <img src={Add_child} alt="Add child" />
                <a href={"/AddChild"}> Add Child</a>
              </div>
      </Router>
    );
};

export default Children;