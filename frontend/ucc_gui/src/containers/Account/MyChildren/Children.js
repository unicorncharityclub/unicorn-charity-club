import React from "react";
import "../Info/Account.css";
import "./MyChildren.css";
import ArrowBackward from "../../../image/arrow-backward.png";
import AddChild from "../../../site_media/Images/Add_Child.png";
import UploadPhoto from "../../../image/Default-profile-picture.png";
import cookie from "react-cookies";

class Children extends React.Component{

  onUpdateUser(emailid)
 {
     cookie.save('user_emailid', emailid);
     window.location.reload(false);
 }

    render(){
        return (
                <div style={{ display: "block" }}>
                    <div className="header__wrapper">
                        <div className="header__logo">
                            <div className="header-menu-mobile">
                                <a href="/Menu">
                                    <img src={ArrowBackward} alt="Backward Arrow" />
                                </a>
                            </div>
                        </div>
                        <div className="header-title">My Children</div>
                    </div>
                    <div>
                        <div className="menu__content">
                            {this.props.data ?
                                (this.props.data.map(item => (
                                <div className="menu__item" key={item.email}>
                                    <img className="profile-picture-list" src={item.photo || UploadPhoto} alt="Child name"/>
                                    <a onClick={this.onUpdateUser.bind(this, item.email)}> {item.name} </a>
                                </div>
                            ))):''}
                            <div className="menu__item">
                                <img src={AddChild} alt="Add child" />
                                <a href={"/AddChild"}> Add Child</a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Children;
