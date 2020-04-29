import React from 'react';
import Image from "react-bootstrap/Image";
import UploadPhoto from "./../../image/Default-profile-picture.png";

class CoverBanner extends React.Component {

    render() {
        return (
            <div className="banner" style={{width: "100%"}} >                
                <Image src={this.props.cover} style={{width: "100%", height:"20em"}}/>                
                <Image className="profilePic" src={this.props.profile || UploadPhoto} />
            </div>
        );
    }
}

export default CoverBanner;
