import React from 'react';
import TextBlueHeading from "../../../../General/Text/TextBlueHeading";
import TextBlack from "../../../../General/Text/TextBlack";
import Image from "react-bootstrap/Image";
import axiosConfig from "../../../../../axiosConfig";
import TextBlackHeading from "../../../../General/Text/TextBlackHeading";
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import Button from "react-bootstrap/Button";
import cookie from "react-cookies";
import {Container} from "@material-ui/core";
import Address from "../../../../General/Form/Address/Address";
import Video from "../../../../General/Video/Video"

class VolunteerTimeDetails extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        project_id: this.props.id,
        projectName : '',
        projectBanner : '',
        projectBadge : '',
        hours : '',
        description :'',
        video :'',
        finalVideo:'',
        userEmailId: cookie.load('user_emailid'),
        name :'',
        address :'',
        city :'',
        state_name : '',
        website :''
    }
 }

 onSubmit(){
        console.log(this.state.project_id)
        console.log(this.state.userEmailId)
        console.log(this.state.name)
        console.log(this.state.address)
        console.log(this.state.city)
        console.log(this.state.state_name)
        console.log(this.state.website)
        console.log(this.state.hours)
        console.log(this.state.description)
 }

defaultIfEmpty(value){
        return value === "" ? "":value;
    }


 changeHandler = (event) =>{
        this.setState({
           [event.target.name]:event.target.value
        })
    };


    componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.project_id}`)
      .then(res => {
              this.setState({
                  projectName : res.data.project_name,
                  projectBanner : res.data.project_banner,
                  projectBadge: res.data.project_badge
              });
      }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <div className="headerStepBanner">
                    <div className="stepper" >
                        <ProgressStepper currentStep="2" />
                    </div>
                    <div className="banner">
                        <ProjectBanner image={this.state.projectBanner}  />
                    </div>
                </div>

                <div className="ProjectInfo_MainDiv"  >
                <div className="ProjectInfo_Container">
                      <div className="ProjectInfo_Badge" >
                        <Image src={this.state.projectBadge} style={{width: "100%", maxHeight: "100%"}} roundedCircle/>
                      </div>

                      <div className="ProjectInfo_Text" >
                        <table>
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                  <TextBlackHeading message={this.state.projectName}/>
                              </td>
                            </tr>

                          <tr>
                              <td>
                                  <TextBlack message="Date joined:"/>
                              </td>
                            </tr>
                          <tr>
                              <td>
                                  <TextBlack message="Status:"/>
                              </td>
                            </tr>
                          </tbody>
                      </table>
                    </div>

                </div>
                </div>

                <form onSubmit={this.handleFormSubmit}>
                <div className="project-form">
                <TextBlueHeading message="Challenge 3: Adventure"/>
                      <br/>
                        <TextBlack message = "VOLUNTEER TIME"/>
                        <br/>
                        <TextBlack message = "Volunteer time at a local organization that supports the mission of the project."/>
                        <div className="project-form-inner">
                            <Address
                                changeHandler = {this.changeHandler.bind(this)}
                            name = {this.state.name}
                            address = {this.state.address}
                            city = {this.state.city}
                            state_name = {this.state.state_name}
                            website = {this.state.website}/>
                            <label>2. How much time did you volunteer? </label> <br/>
                            <input type="number" style={{width:"20%", marginLeft:"40%"}} name="hours" value={this.state.hours}
                                   onChange={this.changeHandler.bind(this)}/>
                                   <label htmlFor="hours">Hours</label>

                            <label>3. Describe what you did to volunteer your time.</label><br/>
                              <textarea name="description"
                                     value={this.defaultIfEmpty(this.state.description)}
                                     onChange={this.changeHandler.bind(this)} /><br/>

                                     <label>3. Share a video or photo that celebrates your volunteer experience.</label>
                          </div>
                    <br/>

                    <div className="buttons">
                        <Button style={{ borderRadius : "50px 0px 0px 50px", backgroundColor:"white", border:"2px solid"}} className = "backButton"  variant="light" size="lg"> BACK </Button>
                        <Button style={{ borderRadius : "0px 50px 50px 0px", border:"2px solid black"}} className = "nextButton" variant="success" size="lg" onClick={this.onSubmit.bind(this)}> NEXT </Button>
                    </div>

                  </div>
                </form>
            </div>
        );
    }
}


export default VolunteerTimeDetails;
