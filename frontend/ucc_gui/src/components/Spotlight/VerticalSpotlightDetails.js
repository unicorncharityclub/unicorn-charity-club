import React from "react";
import Image from 'react-bootstrap/Image';
import AxiosConfig from '../../axiosConfig';
import cookie from "react-cookies";
import DefaultProfilePic from "../../site_media/Images/Default_Avatar.png";

class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        profile_pic : DefaultProfilePic,
        cover_pic : 'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455_1280.jpg',
        dob : '',
        full_name : '',
        address : '',  
        total_projects  : '0',
        people_reached  : '0',
        volunteer_hours  : '0',
        funds_raised  : '0',
        user_email: cookie.load('user_email')      
    }
 }

  componentDidMount(){
    this.fetchProfileInfo(this);    
    this.fetchSpotlightStats(this); 
  }

  fetchProfileInfo (obj) {    
      AxiosConfig.get(`profile/view_profile`)
      .then(function(response) {obj.setProfileInfo(response);})
      .catch(function(error) {console.log(error);});
  }

  fetchSpotlightStats (obj) {
      const user_email = this.state.user_email;
      AxiosConfig.get(`charityproject/socialImpact/${user_email}/`)
      .then(function(response) {obj.setSpotlightStats(response);})
      .catch(function(error) {console.log(error);});
  }

  setSpotlightStats (response) {      
      let total_projects = response.data['total_projects'];  
      let people_reached = response.data['people_reached'];  
      let volunteer_hours = response.data['volunteer_hours'];  
      let funds_raised = response.data['funds_raised'];
      this.setState(prevState => ({
          total_projects  : total_projects,
          people_reached  : people_reached,
          volunteer_hours  : volunteer_hours,
          funds_raised  : funds_raised
      }));   

  }

  setProfileInfo (response) {          
      let dob = response.data['dob'];
      let full_name = response.data['full_name'];
      let address = response.data['address'];
      let profile_pic = response.data['profile_pic'];
      this.setState(prevState => ({
            dob : dob,
            full_name : full_name,
            address : address,
            profile_pic : (profile_pic!=='') ? profile_pic:DefaultProfilePic
    })); 
  
  }

  renderContentVertical () {
      return (  
        <div>                   
            <div className="center_vertical_content">    
              <p className="statistics">
                  {this.state.total_projects}
              </p>
              <p className="statistics_titles">
                Total Projects
              </p>
  
              <p className="statistics">
                {this.state.people_reached}
              </p>
              <p className="statistics_titles" >
                Total People Reached
              </p>
  
              <p className="statistics">
                {this.state.volunteer_hours}
              </p>
              <p className="statistics_titles">
                Total Volunteer Hours
              </p>
  
              <p className="statistics">
                  ${this.state.funds_raised}
              </p>
              <p className="statistics_titles">
                Total Funds Raised
              </p>
          </div>   
        </div>
        
      );
    
  }

  getAge(DOB) {
      var today = new Date();
      var birthDate = new Date(DOB);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age = age - 1;
      }

      return age;
  }

  render() {    
    if (this.props.isSpotlightPage){
        return (
          <div>

            <div>                 
                <Image className="profile_pic_vertical" src={this.state.profile_pic} />
            </div> 

            <div className ="profileDetails_vertical">
              <h3>{this.state.full_name}</h3>
              <h6>Age : {this.getAge(this.state.dob)}</h6>
              <h6>{this.state.address}</h6>
            </div>

            <hr className = "hr_vertical"/>
            <div onClick={(e)=>this.togglePanel(e)} className="header">
                <p>             
                  <span className="collapse_title">{this.props.title}</span>
                  <span className='icon-down-vertical'>&#709;</span>
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
          <div className="content_section_sidebar vertical_project">

            <div>                 
                <Image className="profile_pic_vertical" src={this.state.profile_pic} />
            </div> 

            <div className ="profileDetails_vertical">
              <h3>{this.state.full_name}</h3>
              <h6>Age : {this.getAge(this.state.dob)}</h6>
              <h6>{this.state.address}</h6>
            </div>

            <hr className = "hr_vertical"/>
            <div onClick={(e)=>this.togglePanel(e)} className="header">
                <p>             
                  <span className="collapse_title">{this.props.title}</span>
                  <span className='icon-down-vertical'>&#709;</span>
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