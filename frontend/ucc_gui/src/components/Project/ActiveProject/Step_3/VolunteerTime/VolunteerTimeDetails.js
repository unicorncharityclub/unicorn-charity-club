import React from 'react';
import TextTheme from "../../../../General/Text/TextTheme";
import TextArea from "../../../../General/Form/TextArea"
import Input from  "../../../../../components/General/Form/Input"
import ProjectInfo from "../../../Details/ProjectInfo";
import "../../../../../containers/ProjectCommon.css"
import AxiosConfig from "../../../../../axiosConfig";
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import "../../../../../containers/Projects/ActiveProject/Step_3/VolunteerTime/VolunteerTime.css"
import Address from "../../../../General/Form/Address/Address";
import Video from "../../../../General/Video/Video"
import TwoButtonLayout from "../../../../General/TwoButtonLayout";


/**
 * @summary: Creates the UI of the volunteer time page
 * @description: Creates the fields and styling for the challenge 3 volunteer time page
 * @class: VolunteerTimeDetails
 * @extends: React.component
 * @see: {VolunteerTime.css}
 * @param: projectId, projectName, projectBanner, projectBadge, projectJoinDate, projectChallengeStatus
 * @returns: {VolunteerTimeDetails}
 */

class VolunteerTimeDetails extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        projectId: this.props.id,
        projectName : '',
        projectBanner : '',
        projectBadge : '',
        projectJoinDate :'',
        projectChallengeStatus: '',
        status :"Only numeric values"
    }
 }

    componentDidMount () {
        AxiosConfig.get(`charityproject/${this.state.projectId}/`)
      .then(res => {
              this.setState({
                  projectName : res.data.name,
                  projectBanner : res.data.banner,
                  projectBadge: res.data.badge,
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
                <TextTheme message="Challenge 3: Adventure" className="text_large text_blue" />
                      <br/>
                      <br/>
                      <TextTheme message="VOLUNTEER TIME" className="text_medium text_black" />
                        <br/>
                        <TextTheme message="Volunteer time at a local organization that supports the mission of the project." className="text_medium text_black" />
                        <div className="project-form-inner">
                            <Address
                                changeHandler = {this.props.changeHandler}/>
                                <TextTheme message="2. How much time did you volunteer?" className="text_medium text_black" /><br/>

                            <div className="form_control">
                            <Input inputType="number" name="hours" value={this.props.hours} placeholder='0'
                                   handleChange={this.props.handleNumbers.bind(this)}/>
                                    <label><TextTheme message="Hours" className="text_small text_black"/></label>
                                <br/>

                        </div>
                            <TextTheme message="3. Describe what you did to volunteer your time." className="text_medium text_black" /><br/>
                              <TextArea name="description" rows={3} cols={80}
                                     value={this.props.defaultIfEmpty(this.props.description)}
                                     handleChange={this.props.changeHandler.bind(this)} /><br/>
                                    <TextTheme message="3. Share a video or photo that celebrates your volunteer experience." className="text_medium text_black" />
                          </div>
                    <br/>
                    <Video src={this.props.video}
                        id="file" style={{display: 'none'}}
                           type="file"
                           name="video"
                           accept="video/*"
                           onChange={this.props.videoHandler.bind(this)}/> <br/>

                    <TwoButtonLayout button1Text="SAVE" button2Text="COMPLETE PROJECT"
                           button1Click={(event) => this.props.onSubmit(event, 'Save')} button2Click={(event) => this.props.onSubmit(event, 'Done')}/>

                  </div>
                </form>
            </div>
            </div>
        );
    }
}


export default VolunteerTimeDetails;
