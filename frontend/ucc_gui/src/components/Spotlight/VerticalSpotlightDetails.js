import React from "react";
import Image from 'react-bootstrap/Image';

class ProfileInfo extends React.Component {

    renderContentVertical () {
        return (  
          <div>                   
              <div className="center_vertical_content">    
                <p className="statistics">
                    4
                </p>
                <p className="statistics_titles">
                  Total Projects
                </p>
    
                <p className="statistics">
                  798
                </p>
                <p className="statistics_titles" >
                  Total People Reached
                </p>
    
                <p className="statistics">
                  122
                </p>
                <p className="statistics_titles">
                  Total Volunteer Hours
                </p>
    
                <p className="statistics">
                  $829
                </p>
                <p className="statistics_titles">
                  Total Funds Raised
                </p>
            </div>   
          </div>
          
        );
      }


  render() {    
    if (this.props.isSpotlightPage){
        return (
          <div className="content_section vertical">

            <div> 
                {/* profile pic details here */}
                <Image className="profile_pic_vertical" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" />
            </div> 

            <div className ="profileDetails_vertical">
              <h3>Name</h3>
              <h6>Age</h6>
              <h6>City, State</h6>
            </div>

            <hr className = "hr_vertical"/>
            <div onClick={(e)=>this.togglePanel(e)} className="header">
                <p>             
                  <span className="collapse_title">{this.props.title}</span>
                  <span class='icon-down-vertical'>&#709;</span>
                </p>             
            </div>                      
                <div className="content_vertical">                    
                  { this.renderContentVertical() } 
                  <br/>                             
                </div>          
          </div>
      );
    }else{
      // for projects page      
      return (
          <div className="content_section vertical_project">

            <div> 
                {/* profile pic details here */}
                <Image className="profile_pic_vertical" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" />
            </div> 

            <div className ="profileDetails_vertical">
              <h3>Name</h3>
              <h6>Age</h6>
              <h6>City, State</h6>
            </div>

            <hr className = "hr_vertical"/>
            <div onClick={(e)=>this.togglePanel(e)} className="header">
                <p>             
                  <span className="collapse_title">{this.props.title}</span>
                  <span class='icon-down-vertical'>&#709;</span>
                </p>             
            </div>                      
                <div className="content_vertical">                    
                  { this.renderContentVertical() } 
                  <br/>                             
                </div>          
          </div>
      );
    }
    
  }
}

export default ProfileInfo;