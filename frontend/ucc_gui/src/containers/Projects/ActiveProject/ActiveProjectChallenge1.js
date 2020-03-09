import React from "react";
import ActiveProjectChallengeInfo from "../../../components/Project/ActiveProjectDetails/ActiveProjectChallengeInfo";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge1.css";
import ProgressStepper from "../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../components/Project/ProjectBanner";
import axiosConfig from '../../../axiosConfig'
import { Player } from 'video-react';

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

    render() {
      return(
            <div style={{margin:"15px", marginBottom: "150px"}}> 
                <div className="headerStepBanner">
                    <div className="stepper" >
                        <ProgressStepper currentStep="0" />
                    </div>
                    <div className="banner">
                        <ProjectBanner image={this.state.ProjectBanner}  />
                    </div>
                </div>

                <ActiveProjectChallengeInfo id = {this.state.ProjectID}/>
                <br/>
                <div>
                    <h2 className="textHeader">PLAN YOUR PROJECT GIFT</h2>
                        <p className="insideContent">
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
                    
                                       
                </div>
                <br/>
                <div className="insideContent">                    
                    {this.state.ProjectMission}
                </div>
                <div className="buttonDiv">
                    <Button className = "doneButton" variant="light" size="lg">Done</Button>                    
                </div>

                <br/>
                <br/>
                
                <hr style={{height: "1px", background:"#333"}}/>
                
                <div className="exploreLink">
                    <a href="https://www.pinterest.com/" target="_blank">
                    <h5 className="textHeader">
                        <span className = "explore">Explore More</span>
                    </h5>     
                    </a>
                </div>               
                
                

            </div>
        )
    }
}

export default ActiveProjectChallenge1;  