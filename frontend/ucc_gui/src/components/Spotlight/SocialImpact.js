import React from "react";
import "./Spotlight_Common.css";
import CollapseComponent from "./CollapseComponent";
import VerticalSpotlightDetails from '../../components/Spotlight/VerticalSpotlightDetails';


class SocialImpact extends React.Component {
  render() {
    return (
      <div>
          <div className="page_details_content_main social">        
          <VerticalSpotlightDetails isSpotlightPage = {true}/>
          {/* <CollapseComponent isVertical = {true} title = "My Social Impact"/>               */}
        </div>

        <div className = "content_spotlightInfo">          
          <CollapseComponent  title = "My Social Impact"/>              
        </div>

      </div>
    );
  }
}

export default SocialImpact;