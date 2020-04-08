import React from "react";
import "./Spotlight_Common.css";
import "../../containers/ProjectCommon.css";
import AxiosConfig from '../../axiosConfig';
import cookie from "react-cookies";

class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        about_me : '',
        favorite_thing : '',
        dream : '',
        super_powers : '',
        support : [],              
        user_email: cookie.load('user_email')
    }
 }

  componentDidMount(){
    this.fetchProfileDetails(this);    
  }

  fetchProfileDetails (obj) {
    const user_email = this.state.user_email;
    AxiosConfig.get(`profile/view_profile`)
    .then(function(response) {obj.setProfileDetails(response);})
    .catch(function(error) {console.log(error);});
 }



 setProfileDetails(response) {
  //console.log(response);
  let about_me = response.data['about_me'];
  let favorite_thing = response.data['favorite_thing'];
  let dream = response.data['dream'];
  let super_powers = response.data['super_powers'];
  this.setState(prevState => ({
        about_me : about_me,
        favorite_thing : favorite_thing,
        dream : dream,
        super_powers : super_powers
}));

}


  render() {
    return (
        <div className="content_section">
            <h4 className="profileTitle">About Me</h4> 
            <p>
                {this.state.about_me}              
            </p>        
            <h4 className="profileTitle">My favorite things are...</h4>  
            <p>
                {this.state.favorite_thing}
            </p>       
            <h4 className="profileTitle">I have a dream, that one day...</h4>         
            <p>
                {this.state.dream}
            </p> 
            <h4 className="profileTitle">I have the superpower(s) to...</h4>         
            <p>
                {this.state.super_powers}
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