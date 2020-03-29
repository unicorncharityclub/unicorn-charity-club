import React from 'react';
import TextBlueHeading from "../../../../General/Text/TextBlueHeading";
import TextBlack from "../../../../General/Text/TextBlack";
import TextArea from "../../../../General/Form/TextArea"
import Input from  "../../../../../components/General/Form/Input"
import ProjectInfo from "../../../Details/ProjectInfo";
import "../../../../../containers/ProjectCommon.css"
import axiosConfig from "../../../../../axiosConfig";
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import "../../../../../containers/Projects/ActiveProject/Step_3/VolunteerTime/VolunteerTime.css"
import Address from "../../../../General/Form/Address/Address";
import Video from "../../../../General/Video/Video"
import TwoButtonLayout from "../../../../General/TwoButtonLayout";
import TextBlackSubHeading from "../../../../General/Text/TextBlackSubHeading";

class VolunteerTimeDetails extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        projectId: this.props.id,
        projectName : '',
        projectBanner : '',
        projectBadge : '',
        projectJoinDate :'',
        projectChallengeStatus: ''
    }
 }

    componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.projectId}`)
      .then(res => {
              this.setState({
                  projectName : res.data.project_name,
                  projectBanner : res.data.project_banner,
                  projectBadge: res.data.project_badge,
                  projectJoinDate: res.data.project_join_date,
                  projectChallengeStatus: res.data.challenge_status
              });
      }).catch(error => console.log(error))
    }

    render() {
        return (
            <div style={{ margin: "10px" }}>
        <div style={{ marginBottom: "150px" }}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="header_step_banner_common">
                    <div className="stepper_common">
                    <ProgressStepper currentStep="2" />
                    </div>
                    <div className="banner_common">
                    <ProjectBanner image={this.state.projectBanner}  />
                    </div>
                    </div>
                    <div className="content_project_info_vertical">
                    <ProjectInfo vertical={true} id={this.state.projectId} />
                    </div>
                {/*<div className="project-form">*/}
                <div className="content_section">
                <div className="content_project_info">
                <ProjectInfo id={this.state.projectId} />
                </div>
                <TextBlueHeading message="Challenge 3: Adventure"/>
                      <br/>
                      <br/>
                        <TextBlackSubHeading message = "VOLUNTEER TIME"/>
                        <br/>
                        <TextBlackSubHeading message = "Volunteer time at a local organization that supports the mission of the project."/>
                        <div className="project-form-inner">
                            <Address
                                changeHandler = {this.props.changeHandler}/>
                            <TextBlackSubHeading message ="2. How much time did you volunteer?"/> <br/>

                            <div className="form_control">
                            <Input type="number" name="hours" value={this.props.hours}
                                   handleChange={this.props.changeHandler}/>
                                    <label><TextBlack message="Hours"/></label>
                                <br/>

                        </div>

                            <TextBlackSubHeading message = "3. Describe what you did to volunteer your time."/><br/>
                              <TextArea name="description" rows={3} cols={80}
                                     value={this.props.defaultIfEmpty(this.props.description)}
                                     handleChange={this.props.changeHandler.bind(this)} /><br/>

                                     <TextBlackSubHeading message="3. Share a video or photo that celebrates your volunteer experience."/>
                          </div>
                    <br/>
                    <Video src={this.props.video}
                        id="file" style={{display: 'none'}}
                           type="file"
                           name="video"
                           accept="video/*"
                           onChange={this.props.videoHandler.bind(this)}/>
                           <div>
                    <TwoButtonLayout button1Text="SAVE" button2Text="COMPLETE PROJECT"
                           button1Click={this.props.onSubmit} button2Click={this.props.onSubmit}/>
                           </div>

                  </div>
                </form>
            </div>
            </div>
        );
    }
}


export default VolunteerTimeDetails;
