import React from "react";
import Image from 'react-bootstrap/Image';
import AxiosConfig from '../../axiosConfig';

class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        profile_pic : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        cover_pic : 'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455_1280.jpg',
        dob : '',
        full_name : '',
        address : '',        
    }
 }

  componentDidMount(){
    this.fetchProfileInfo(this);    
  }

  fetchProfileInfo (obj) {    
    AxiosConfig.get(`profile/view_profile`)
    .then(function(response) {obj.setProfileInfo(response);})
    .catch(function(error) {console.log(error);});
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
            profile_pic : profile_pic
    })); 
  
  }

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
          <div className="content_section vertical">

            <div> 
                {/* profile pic details here */}
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