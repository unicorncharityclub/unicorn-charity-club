import React from "react";
import ActiveProjectChallengeInfo from "../../../../components/Project/ActiveProject/Step_1/ActiveProjectChallengeInfo";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge1.css";
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import axiosConfig from '../../../../axiosConfig'
import { Player } from 'video-react';
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";

class ActiveProjectChallenge1 extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            ProjectID : this.props.match.params.id,
            ProjectName : '',
            ProjectBanner : '',
            ProjectVideoName : '',
            ProjectVideo : '',
            ProjectMission : ''                        
        }
     }

     componentDidMount () {        
        axiosConfig.get(`charityproject/${this.state.ProjectID}`)
      .then(res => {
              this.setState({
                  ProjectName : res.data["project_name"],
                  ProjectBanner : res.data["project_banner"],                  
                  ProjectVideo: res.data["project_video"],
                  ProjectVideoName: res.data["project_video_name"],
                  ProjectMission : res.data["project_mission"]
              });
          console.log(res.data)
      }).catch(error => console.log(error))
    }

    buttonHandler() {
        // on button click action
        window.open('/Projects/' +this.props.match.params.id + '/ActiveProjectChallenge2/',"_self");
    }

    render() {
      return(
            <div style={{margin:"15px", marginBottom: "150px"}}> 
                <div className="header_step_banner_common">
                    <div className="stepper_common" >
                        <ProgressStepper currentStep="0" />
                    </div>
                    <div className="banner_common">
                        <ProjectBanner image={this.state.ProjectBanner}  />
                    </div>
                </div>

                <div className="content_project_info_vertical">
                    <ActiveProjectChallengeInfo vertical={true} id = {this.state.ProjectID}/>                    
                </div>
                
                <br/>
                <div className="content_section">
                    <h2 className="textHeader">CHALLENGE 1: Exploration</h2>
                        <p className="insideContent">
                        <br/>
                        PRESENTATION
                        <br/>
                        Prep for Success Exploration Presentation
                        </p> 
                        <div>                            
                            <Player
                            playsInline                      
                            src={this.state.ProjectVideo}
                            />
                        </div>

                        <br/>
                        <div className="insideContent">                    
                            {this.state.ProjectMission}
                        </div>    
                                       
                </div>
                
                <div className="insideContent1">                    
                    {this.state.ProjectMission}
                </div>
                                
                
                {/* <hr style={{height: "1px", background:"#333"}}/> */}
                
                <div className="exploreLink content_section">
                    <div className = "inside-content">
                    <a href="https://www.pinterest.com/" target="_blank">
                    <h5 className="textHeader">
                        <span>Explore More</span>
                    </h5>     
                    </a>
                    </div>
                </div>

                <div className="buttonDiv">                    
                    <Button className = "doneButton" variant="light" size="lg" onClick = {this.buttonHandler.bind(this)}>Done</Button>                    
                </div>               
            </div>
        )
    }
}

export default ActiveProjectChallenge1;  