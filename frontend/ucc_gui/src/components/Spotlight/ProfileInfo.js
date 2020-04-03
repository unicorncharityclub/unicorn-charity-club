import React from "react";
import CoverBanner from "./CoverBanner";

class ProfileInfo extends React.Component {
  render() {
    return (
        <div>
            <div >
              <CoverBanner  
                cover="https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455_1280.jpg"  
                profile="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"  
              />
              <div className ="profileDetails">
                <h3>Name</h3>
                <h5>Age - City, State</h5>
              </div>
            </div>         
        </div>
    );
  }
}

export default ProfileInfo;