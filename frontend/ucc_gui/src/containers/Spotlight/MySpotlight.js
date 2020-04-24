import React from "react";
import "./MySpotlight.css";
import "../ProjectCommon.css"
import ProfileInfo from "../../components/Spotlight/ProfileInfo";
import ProfileDetails from "../../components/Spotlight/ProfileDetails";
import SocialImpact from "../../components/Spotlight/SocialImpact";
import CompletedProjects from "../../components/Spotlight/CompletedProjects";
import TreasureTrove from "../../components/Spotlight/TreasureTrove";

class MySpotlight extends React.Component {
  render() {
    return (
        <div className="header_main main_spotlight">
            <div className="page_main main_page"> 
                <ProfileInfo />
               
                <ProfileDetails />
                
                <SocialImpact />
                             
                <CompletedProjects />
                
                <TreasureTrove />           
            </div> 
        </div>
    );
  }
}

export default MySpotlight;