import React from "react";
import "./ProjectInvitation.css";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import Button from 'react-bootstrap/Button';
import cookie from "react-cookies";
import AxiosConfig from '../../../../axiosConfig'
import { Player } from 'video-react';
import AlertMessage from "../../../../components/General/AlertMessage";
import ProjectBanner from "../../../../components/Project/ProjectBanner";

class ProjectInvitation extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            userName : '',
            userEmail : cookie.load('user_email'),
            invitationMessage : '',
            video: '',
            projectCategory: '',
            projectTags: '',
            projectMission: '',
            projectGoal: '',
            errorMessage : '',
            projectBanner : ''
        }
     }

    buttonHandler () {
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
                errorMessage : res.data.status
            });               
            console.log(res);
        }).catch(error => console.log(error))

        // now move to challenge 1
        window.open('/Projects/'+ this.props.match.params.id +'/ActiveProjectChallenge1',"_self");
    }

    componentDidMount () {
        // get details for invitation
        this.getInvitationDetails() ;
        
        // get project banner
        this.getProjectBanner();
    }

    getProjectBanner () {
        const projectId = this.props.match.params.id;

        AxiosConfig.get(`/charityproject/${projectId}/`)
        .then(res => {
                this.setState({                  
                    projectBanner: res.data["banner"]
                });
            //console.log(res);
        }).catch(error => console.log(error))

    }

    getInvitationDetails() {
        
        const projectId = this.props.match.params.id;
        const inviterEmail = this.props.match.params.inviterEmail;
        const invitedEmail = this.state.userEmail;
               
        AxiosConfig.get(`/charityproject/project_invitation/`, {
            params: { 
                project_id : projectId,
                inviter_user_email : inviterEmail
            }                                
        })
        .then(res => {
                this.setState({                  
                    userName : res.data["invitee_user_name"],
                    invitationMessage : res.data.invitation_message,
                    video: res.data.video,
                    projectCategory: res.data.project.category,
                    projectTags: res.data.project.tags,
                    projectMission: res.data.project.mission,
                    projectGoal: res.data.project.goal
                });
            //console.log(res);
        }).catch(error => console.log(error))
    }


    showAlertMsg () {        
        if (!this.state.error_message !== "Success"){
            return (                
                <AlertMessage alertMessage={this.state.errorMessage} />
            );
        }
    }

    render() {
      return(
            <div style={{margin:"25px"}}> 
                
                {/* Add project banner here */}
                <div className="banner_common banner_inside">
                    <ProjectBanner image={this.state.projectBanner}  />
                    <br/>
                </div>

                <div className="content_project_info_vertical">
                    <ProjectInfo vertical={true} id={this.props.match.params.id} />
                </div>

                <div className = "content_section">
                    <h2 className="textHeader">PROJECT INVITATION</h2>

                    <div className = "insideContent">                    
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
                    </div>

                    <br/>
                    
                    <ProjectInfo id = {this.props.match.params.id} />

                    <div>
                        <h2 className="textHeader">Project Mission</h2>
                        <p className = "insideContent">
                            {this.state.projectMission}
                        </p>
                    </div>

                    <div>
                        <h2 className="textHeader">Project Goal</h2>
                        <p className = "insideContent">
                            {this.state.projectGoal}
                        </p>
                    </div>

                    <br/>

                        <Button className = "startButton" onClick={this.buttonHandler.bind(this)} variant="success" size="lg">
                            JOIN PROJECT
                        </Button>
                        <div style={{width:"100%"}}>
                            {/* {this.showAlertMsg}  */}
                        </div>
                    </div>                    
            </div>
        )
    }
}

export default ProjectInvitation;  