import React from "react";
import "../Info/Account.css";
import "./MyChildren.css";
import Arrow_backward from "../../../image/arrow-backward.png";
import Add_child from "../../../site_media/Images/Add_Child.png";
import Upload_photo from "../../../image/Default-profile-picture.png";
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
                                    <img src={Arrow_backward} alt="Backward Arrow" />
                                </a>
                            </div>
                        </div>
                        <div className="header-title">My Children</div>
                    </div>
                    <div>
                        <div className="menu__content">
                            {this.props.data ?
                                (this.props.data.map(item => (
                                <div className="menu__item" key={item.EmailId}>
                                    <img className="profile-picture-list" src={item.Photo || Upload_photo} alt="Child name"/>
                                    <a onClick={this.onUpdateUser.bind(this, item.EmailId)}> {item.Name} </a>
                                </div>
                            ))):''}
                            <div className="menu__item">
                                <img src={Add_child} alt="Add child" />
                                <a href={"/AddChild"}> Add Child</a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Children;
