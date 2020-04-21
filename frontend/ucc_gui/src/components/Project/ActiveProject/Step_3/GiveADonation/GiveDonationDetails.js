import React from 'react';
import TextBlueHeading from "../../../../General/Text/TextBlueHeading";
import TextArea from "../../../../General/Form/TextArea"
import ProjectInfo from "../../../Details/ProjectInfo";
import "../../../../../containers/ProjectCommon.css"
import AxiosConfig from "../../../../../axiosConfig";
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import "../../../../../containers/Projects/ActiveProject/Step_3/VolunteerTime/VolunteerTime.css"
import Address from "../../../../General/Form/Address/Address";
import Video from "../../../../General/Video/Video"
import TwoButtonLayout from "../../../../General/TwoButtonLayout";
import TextBlackSubHeading from "../../../../General/Text/TextBlackSubHeading";

/**
 * @summary: Creates the UI of the give a donation page
 * @description: Creates the fields and styling for the challenge 3 give a donation page
 * @class: GiveDonationDetails
 * @extends: React.component
 * @see: {VolunteerTime.css}
 * @param: projectId, projectName, projectBanner, projectBadge, projectJoinDate, projectChallengeStatus
 * @returns: {GiveDonationDetails}
 */


class GiveDonationDetails extends React.Component {
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
            <div className="header_main">
                <div className="header_step_banner_main">
                    <div className="banner_main">
                        <div className="banner_main_content">
                            <ProjectBanner image={this.state.projectBanner}  />
                        </div>
                    </div>

                    <div className="stepper_main">
                        <div className="stepper_main_content">
                            <ProgressStepper currentStep="2" />
                        </div>
                    </div>
                </div>

                <div className="page_info_hr_content_main">
                    <ProjectInfo id={this.props.id} />
                </div>

                <div className="page_main">
                    <div className="page_info_vr_content_main">
                        <ProjectInfo vertical={true} id={this.props.id} />
                    </div>

                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <form onSubmit={this.handleFormSubmit}>
                                    <TextBlueHeading message="Challenge 3: Adventure"/>
                                <br/>                                
                                    <TextBlackSubHeading message = "GIVE A DONATION"/>                                    
                                    <TextBlackSubHeading message = "Give a donation to a local organization that supports the mission of the project."/>
                                    <div className="project-form-inner">
                                        <Address
                                        changeHandler = {this.props.changeHandler}/>

                                    <TextBlackSubHeading message = "3. Describe what you donated."/><br/>
                                    <TextArea name="description" rows={3} cols={80}
                                            value={this.props.defaultIfEmpty(this.props.description)}
                                            handleChange={this.props.changeHandler.bind(this)} />

                                            <TextBlackSubHeading message="3. Share a video or photo that celebrates your volunteer experience."/>
                                </div>
                                <br/>
                                <Video src={this.props.video}
                                    id="file" style={{display: 'none'}}
                                    type="file"
                                    name="video"
                                    accept="video/*"
                                    onChange={this.props.videoHandler.bind(this)}/>
                                    <div> <br/>
                                <TwoButtonLayout button1Text="SAVE" button2Text="DONE"
                                    button1Click={(event) => this.props.onSubmit(event, 'Save')}
                                                button2Click={(event) => this.props.onSubmit(event, 'Done')}/>
                                    </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default GiveDonationDetails;
