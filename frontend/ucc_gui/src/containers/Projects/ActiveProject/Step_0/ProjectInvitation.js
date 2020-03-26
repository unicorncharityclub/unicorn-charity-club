import React from "react";
import "./ProjectInvitation.css";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import Button from 'react-bootstrap/Button';
import cookie from "react-cookies";
import axiosConfig from '../../../../axiosConfig'
import { Player } from 'video-react';
import AlertMessage from "../../../../components/General/AlertMessage";

class ProjectInvitation extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            user_name : '',
            user_email_id : cookie.load('user_emailid'),            
            invitation_message : '',
            video: '',
            project_category: '',
            project_tags: '',
            project_Mission: '',
            project_goal: '',
            error_message : ''
        }
        
     }

    buttonHandler () {
        // post requested data 
        const project_id = this.props.match.params.id;
        const inviter_email = this.props.match.params.inviter_email;                    
        const invited_email = this.state.user_email_id;                            
               
        axiosConfig.get(`/charityproject/joinProject`, {            
            params: { 
                project_id : project_id,
                user_email : invited_email,
                inviter_user_email : inviter_email
            }                                
        })
        .then(res => { 
            // saving the res message to show later
            this.setState({     
                error_message : res.data.status
            });               
            console.log(res);
        }).catch(error => console.log(error))

        
        // now move to challenge 1
        window.open('/Projects/'+ this.props.match.params.id +'/ActiveProjectChallenge1',"_self");

    }

    componentDidMount () {        
        // get details for invitation
        const project_id = this.props.match.params.id;
        const inviter_email = this.props.match.params.inviter_email;                    
        const invited_email = this.state.user_email_id;                            
               
        axiosConfig.get(`/charityproject/invitation/Details`, {            
            params: { 
                project_id : project_id,
                user_email : invited_email,
                inviter_user_email : inviter_email
            }                                
        })
        .then(res => {
                this.setState({                  
                    user_name : res.data.invitation_details["user_name"],                         
                    invitation_message : res.data.invitation_details["message"],
                    video: res.data.invitation_details["video"],
                    project_category: res.data.invitation_details["project_category"],
                    project_tags: res.data.invitation_details["project_tags"],
                    project_Mission: res.data.invitation_details["project_Mission"],
                    project_goal: res.data.invitation_details["project_goal"]                       
                });
            //console.log(res);
        }).catch(error => console.log(error))

    }

    showAlertMsg () {        
        if (!this.state.error_message !== "Success"){
            return (                
                <AlertMessage alertMessage={this.state.error_message} />               
            );
        }
    }

    render() {
      return(
            <div style={{margin:"35px", marginBottom: "150px"}}> 
                <div className = "insideContent">                    
                    <h3>DEAR {this.state.user_name.toUpperCase()},</h3>
                    <p>
                        {this.state.invitation_message}
                    </p>

                    <div>
                        <Player
                            playsInline                      
                            src={this.state.video}
                        />    
                    </div>
                </div>
                <ProjectInfo id={this.props.match.params.id} />

                <div>
                    <h2 className="textHeader">Project Mission</h2>
                    <p className = "insideContent">
                        {this.state.project_Mission}   
                    </p>
                  </div>

                  <div>
                    <h2 className="textHeader">Project Goal</h2>
                    <p className = "insideContent">
                        {this.state.project_goal}  
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
        )
    }
}

export default ProjectInvitation;  