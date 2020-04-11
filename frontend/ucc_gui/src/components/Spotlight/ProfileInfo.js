import React from "react";
import CoverBanner from "./CoverBanner";
import AxiosConfig from '../../axiosConfig';
import cookie from "react-cookies";

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        profile_pic : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        cover_pic : 'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455_1280.jpg',
        age : '25',
        city : 'Tempe',
        state : 'Arizona',
        user_email: cookie.load('user_email')
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
    return (      
        <div>          
            <div className="profileInfo">
              <CoverBanner  
                cover= {this.state.cover_pic}  
                profile={this.state.profile_pic}
              />
              <div className ="profileDetails">
                {console.log(this.state.full_name)}
                <h3>{this.state.full_name}</h3>
                <h5>Age : {this.getAge(this.state.dob)} - {this.state.address}</h5>
              </div>
            </div>         
        </div>
    );
  }
}

export default ProfileInfo;