import React from "react";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import Button from 'react-bootstrap/Button';
import cookie from "react-cookies";
import AxiosConfig from '../../../../axiosConfig'
import {Player} from 'video-react';
import TextTheme from "../../../../components/General/Text/TextTheme";
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import ProgressStepper from "../../../../components/Project/ProgressStepper";

class ProjectInvitation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: cookie.load('user_email'),
            invitationMessage: '',
            video: '',
            projectCategory: '',
            projectTags: '',
            projectMission: '',
            projectGoal: '',
            errorMessage: '',
            projectBanner: ''
        }
    }

    buttonHandler() {
        // post requested data 
        const projectId = this.props.match.params.id;
        const inviterEmail = this.props.match.params.inviterEmail;
        const invitedEmail = this.state.userEmail;

        let formData = new FormData();
        formData.append('project_id', projectId);
        formData.append('inviter_user_email', inviterEmail);
        formData.append('create_type', "invite");

        AxiosConfig.post(`/charityproject/start/`, formData)
            .then(res => {
                // saving the res message to show later
                this.setState({
                    errorMessage: res.data.status
                });
                console.log(res);
            }).catch(error => console.log(error))

        window.open('/Projects/' + this.props.match.params.id + '/ActiveProjectChallenge1', "_self");
    }

    componentDidMount() {
        this.getInvitationDetails();
        this.getProjectBanner();
    }

    getProjectBanner() {
        const projectId = this.props.match.params.id;

        AxiosConfig.get(`/charityproject/${projectId}/`)
            .then(res => {
                this.setState({
                    projectBanner: res.data["banner"]
                });
            }).catch(error => console.log(error))
    }

    getInvitationDetails() {

        const projectId = this.props.match.params.id;
        const inviterEmail = this.props.match.params.inviterEmail;

        AxiosConfig.get(`/charityproject/project_invitation_details/`, {
            params: {
                project_id: projectId,
                inviter_user_email: inviterEmail
            }
        })
            .then(res => {
                this.setState({
                    userName: res.data["invitee_user_name"],
                    invitationMessage: res.data.invitation_message,
                    video: res.data.video,
                    projectCategory: res.data.project.category,
                    projectTags: res.data.project.tags,
                    projectMission: res.data.project.mission,
                    projectGoal: res.data.project.goal
                });
            }).catch(error => console.log(error))
    }


    showAlertMsg() {
        if (!this.state.error_message !== "Success") {
            return (
                <TextTheme message={this.state.errorMessage} className="text_medium text_red"/>
            );
        }
    }

    render() {
        return (

            <div className="header_main">
                <div className="page_info_hr_content_main">
                    <div className="header_step_banner_main">
                        <div className="banner_main">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.state.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="0"/>
                            </div>
                        </div>
                    </div>

                    <ProjectInfo id={this.state.projectID}/>
                </div>

                <div className="page_main">
                    <div className="page_info_vr_content_main">
                        <ProjectInfo vertical={true} id={this.props.match.params.id}/>
                    </div>

                    <div className="header_step_banner_main_vr">
                        <div className="banner_main_vr">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.state.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main_vr">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="0"/>
                            </div>
                        </div>
                    </div>

                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <h2 className="textHeader">PROJECT INVITATION</h2>

                            <h4>DEAR {this.state.userName.toUpperCase()},</h4>
                            <p>
                                {this.state.invitationMessage}
                            </p>

                            <div>
                                <Player
                                    playsInline
                                    src={this.state.video}
                                />
                            </div>

                            <br/>

                            <div className="page_info_hr_content_main">
                                <ProjectInfo id={this.props.match.params.id}/>
                            </div>

                            <div>
                                <h2 className="textHeader">Project Mission</h2>
                                {this.state.projectMission}
                            </div>

                            <div>
                                <h2 className="textHeader">Project Goal</h2>
                                {this.state.projectGoal}
                            </div>

                            <br/>

                            <div className="JoinBtn">
                                <Button className="startButton" onClick={this.buttonHandler.bind(this)}
                                        variant="success" size="lg">
                                    JOIN PROJECT
                                </Button>
                            </div>

                            <div style={{width: "100%"}}>
                                {/* {this.showAlertMsg}  */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ProjectInvitation;  