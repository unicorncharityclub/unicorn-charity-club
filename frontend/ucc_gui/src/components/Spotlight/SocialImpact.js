import React from "react";
import "./Spotlight_Common.css";
import CollapseComponent from "./CollapseComponent";


class SocialImpact extends React.Component {
  render() {
    return (
      <div>
        <div className = "content_spotlightInfo_vertical">          
          <CollapseComponent isVertical = {true} title = "My Social Impact"/>              
        </div>

        <div className = "content_spotlightInfo">          
          <CollapseComponent  title = "My Social Impact"/>              
        </div>

      </div>
    );
  }
}

export default SocialImpact;