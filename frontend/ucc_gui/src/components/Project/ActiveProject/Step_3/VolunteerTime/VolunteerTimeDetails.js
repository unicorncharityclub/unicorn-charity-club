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

class VolunteerTimeDetails extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        Project_id: this.props.id,
        ProjectName : '',
        ProjectBanner : '',
        ProjectBadge : '',
        Hours : '',
        Description :'',
        video :'',
        finalVideo:'',
        UserEmailId: cookie.load('user_emailid'),
        Name :'',
        Address :'',
        City :'',
        State_name : '',
        Website :''
    }
 }

 onSubmit(){
        console.log(this.state.Project_id)
        console.log(this.state.UserEmailId)
        console.log(this.state.Name)
        console.log(this.state.Address)
        console.log(this.state.City)
        console.log(this.state.State_name)
        console.log(this.state.Website)
        console.log(this.state.Hours)
        console.log(this.state.Description)
 }

 defaultIfEmpty(value){
        return value === "" ? "":value;
    }

    videoHandler = (event) =>{
       this.setState({
           video : URL.createObjectURL(event.target.files[0]),
           finalVideo: event.target.files[0]
        });
    };


 changeHandler = (event) =>{
        this.setState({
           [event.target.name]:event.target.value
        })
    };


    componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.Project_id}`)
      .then(res => {
              this.setState({
                  ProjectName : res.data.project_name,
                  ProjectBanner : res.data.project_banner,
                  ProjectBadge: res.data.project_badge
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
                        <ProjectBanner image={this.state.ProjectBanner}  />
                    </div>
                </div>

                <div className="ProjectInfo_MainDiv"  >
                <div className="ProjectInfo_Container">
                      <div className="ProjectInfo_Badge" >
                        <Image src={this.state.ProjectBadge} style={{width: "100%", maxHeight: "100%"}} roundedCircle/>
                      </div>

                      <div className="ProjectInfo_Text" >
                        <table>
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                  <TextBlackHeading message={this.state.ProjectName}/>
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
                            Name = {this.state.Name}
                            Address = {this.state.Address}
                            City = {this.state.City}
                            State_name = {this.state.State_name}
                            Website = {this.state.Website}/>
                            <label>2. How much time did you volunteer? </label> <br/>
                            <input type="number" style={{width:"20%", marginLeft:"40%"}} name="Hours" value={this.state.Hours}
                                   onChange={this.changeHandler.bind(this)}/>
                                   <label htmlFor="Hours">Hours</label>

                            <label>3. Describe what you did to volunteer your time.</label><br/>
                              <textarea name="Description"
                                     value={this.defaultIfEmpty(this.state.Description)}
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
