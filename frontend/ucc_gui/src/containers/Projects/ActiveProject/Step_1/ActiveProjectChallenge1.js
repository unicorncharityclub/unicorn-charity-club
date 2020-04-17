import React from "react";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge1.css";
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import AxiosConfig from '../../../../axiosConfig'
import { Player } from 'video-react';
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";

class ActiveProjectChallenge1 extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            projectID : this.props.match.params.id,
            projectName : '',
            projectBanner : '',
            projectVideoName : '',
            projectVideo : '',
            projectMission : ''
        }
     }

     componentDidMount () {        
        AxiosConfig.get(`charityproject/${this.state.projectID}/`)
      .then(res => {
              this.setState({
                  projectName : res.data["name"],
                  projectBanner : res.data["banner"],
                  projectVideo: res.data["video"],
                  projectVideoName: res.data["project_video_name"],
                  projectMission : res.data["mission"]
              });
          console.log(res.data)
      }).catch(error => console.log(error))
    }

    buttonHandler() {
        // on button click action

        // put req on done button click
        AxiosConfig.put(`charityproject/update/Challenge/`, {
            "project_id" : this.props.match.params.id           
        })
        .then(this.props.history.push(`/Projects/${this.props.match.params.id}/ActiveProjectChallenge2`))
        .catch(error => console.log(error))


        // window.open('/Projects/' +this.props.match.params.id + '/ActiveProjectChallenge2/',"_self");
    }

    render() {
      return(
            <div style={{margin:"15px"}}> 
                <div className="header_step_banner_common">
                    <div className="stepper_common" >
                        <ProgressStepper currentStep="0" />
                    </div>
                    <div className="banner_common">
                        <ProjectBanner image={this.state.projectBanner}  />
                    </div>
                </div>

                <div className="content_project_info_vertical">
                    <ProjectInfo vertical={true} id = {this.state.projectID}/>
                </div>
                        
                
                <div className="content_section">
                    <div className="content_project_info">
                        <ProjectInfo vertical={false} id = {this.state.projectID}/>
                    </div>
                    
                    <br/>
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
                            src={this.state.projectVideo}
                            />
                        </div>

                        <br/>
                        <div className="insideContent">                    
                            {this.state.projectMission}
                        </div>    
                                       
                </div>
                
                <div className="insideContent1">                    
                    {this.state.projectMission}
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