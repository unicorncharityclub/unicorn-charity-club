import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";
import Arrow_backward from "../../image/arrow-backward.png";
import Upload_photo from "../../image/Default-profile-picture.png";

const Children= props => {
    // const ListItems =
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
          <div>
              <div className="menu__content">
                  {props.data.map(item => (
                        <div className="menu__item" key={item.Name}>
                            <img className="profile-picture-list" src={item.Photo || Upload_photo} alt="Child name"/>
                            <a href={`/MyChildren/${item.id}`}> {item.Name} </a>
                        </div>
                  ))}

          </div>
          </div>
        </div>
      </Router>
    );
};

export default Children;