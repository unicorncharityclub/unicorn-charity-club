import React from 'react';
import TextBlueHeading from "../../../../General/Text/TextBlueHeading";
import TextBlack from "../../../../General/Text/TextBlack";
import Image from "react-bootstrap/Image";
import axiosConfig from "../../../../../axiosConfig";
import TextBlackHeading from "../../../../General/Text/TextBlackHeading";
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import Upload_video from "../../../../../image/Settings_Camera.png";
import Button from "react-bootstrap/Button";
import cookie from "react-cookies";
import {Player} from "video-react";

class VolunteerTimeDetails extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        Project_id: this.props.id,
        ProjectName : '',
        ProjectBanner : '',
        ProjectBadge : '',
        Name :'',
        Address :'',
        City :'',
        State_name : '',
        Website :'',
        Hours : '',
        Description :'',
        video :'',
        finalVideo:'',
        UserEmailId: cookie.load('user_emailid')
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
            ...this.state,
            [event.target.name]: event.target.value
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
                              <label>1. Local Organization </label> <br/>
                              <input type="text"
                                    name="Name"
                                     placeholder="Name"
                                    value={this.state.Name}
                                     onChange={this.changeHandler.bind(this)}/> <br/><br/>

                              <input type="text"
                                    name="Address"
                                     placeholder="Address"
                                    value={this.state.Address}
                                    onChange={this.changeHandler.bind(this)}/> <br/><br/>

                                    <input type="text"
                                           style={{float:"left", width:"60%"}}
                                    name="City"
                                           placeholder="City"
                                    value={this.state.City}
                                    onChange={this.changeHandler.bind(this)}/>

                                    <input type="text"
                                           style={{float:"left", width:"18%"}}
                                    name="State_name"
                                    value={this.state.State_name}
                                           placeholder="State"
                                    onChange={this.changeHandler.bind(this)}/> <br/><br/>
                                    <br/>

                                    <input type="text"
                                    name="Website"
                                           placeholder="Website"
                                    value={this.state.Website}
                                           onChange={this.changeHandler.bind(this)}/> <br/>
                                           <label>2. How much time did you volunteer? </label> <br/>
                                   <input type="number" style={{width:"20%", marginLeft:"40%"}}
                                    name="Hours"
                                    value={this.state.Hours}
                                    onChange={this.changeHandler.bind(this)}/>
                                       <label htmlFor="Hours">Hours</label>



                            <label>3. Describe what you did to volunteer your time.</label><br/>
                              <textarea name="Description"
                                     value={this.defaultIfEmpty(this.state.Description)}
                                     onChange={this.changeHandler.bind(this)} /><br/>

                              <label>3. Share a video or photo that celebrates your volunteer experience.</label>

                          </div>

                    <div className="project-video-preview">
                        {
                              this.state.video ?
                                  <div className="video-upload-preview">
                                      <Player playsInline
                                          src={this.state.video}
                                      />
                                  </div>:''
                        }
                    </div>

                    <div className="project-video">
                          <img className="project-video-upload" src={Upload_video} alt=""/>
                          <input id="file" style={{display: 'none'}}
                                         type="file"
                                         name="video"
                                         accept="video/*"
                                         onChange={this.videoHandler.bind(this)}/>
                          <label className="upload-video" htmlFor="file">Upload/Create Video</label>
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
