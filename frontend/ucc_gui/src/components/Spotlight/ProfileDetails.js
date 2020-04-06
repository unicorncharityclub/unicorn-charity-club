import React from "react";
import "./Spotlight_Common.css";
import "../../containers/ProjectCommon.css";

class ProfileDetails extends React.Component {
  render() {
    return (
        <div className="content_section">
            <h4 className="profileTitle">About Me</h4> 
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.                
            </p>        
            <h4 className="profileTitle">My favorite things are...</h4>  
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.                
            </p>       
            <h4 className="profileTitle">I have a dream, that one day...</h4>         
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.                
            </p> 
            <h4 className="profileTitle">I have the superpower(s) to...</h4>         
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.                 
            </p> 
            <h4 className="profileTitle">I will make the world a better place by supporting:</h4>         
            <ul>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ul>

            <hr className="horizontal"/>
        </div>
    );
  }
}

export default ProfileDetails;