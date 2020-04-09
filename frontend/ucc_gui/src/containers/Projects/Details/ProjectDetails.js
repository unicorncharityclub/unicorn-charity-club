import React from "react";
import ProjectInfo from "../../../components/Project/Details/ProjectInfo";
import { Container } from "@material-ui/core";
import AxiosConfig from '../../../axiosConfig'
import "./ProjectDetails.css";
import Button from 'react-bootstrap/Button';
import "../../../../node_modules/video-react/dist/video-react.css"
import { Player } from 'video-react';
import cookie from "react-cookies";
import "../../ProjectCommon.css"
import ProjectBanner from "../../../components/Project/ProjectBanner";

class ProjectDetails extends React.Component {
    onSubmit()
    {
        const projectId = this.props.match.params.id;

        AxiosConfig.post('charityproject/start',
            {"project_id":projectId,
                    "user_email": this.state.userEmail},
                )
                .then(res => this.props.history.push(`/Projects/${projectId}/StartNewProject`))
                .catch(error => console.log(error))
    }

    constructor(props) {
        super(props); 
        this.state = {
            projectMission : '',
            projectGoal : '',
            projectVideoName : '',
            projectVideo : '',
            projectBanner: '',
            projectName: '',
            userEmail: cookie.load('user_email')
        }
     }  

    componentDidMount () {
      const projectId = this.props.match.params.id;
      AxiosConfig.get(`charityproject/${projectId}/`)
      .then(res => {
              this.setState({                  
                  projectMission : res.data.mission,
                  projectName: res.data.name,
                  projectBanner : res.data.banner,
                  projectGoal : res.data.goal,
                  projectVideoName : res.data.project_video_name,
                  projectVideo : res.data.video
              });
      }).catch(error => console.log(error))
    }

    render() {
      return(
            <div>  
              <Container>                                        
                  {/* {console.log(this.props)} */}
                  <div className="header_step_banner_common">
                    <div className="banner_common">
                    <ProjectBanner image={this.state.projectBanner}  />
                    </div>
                    </div>
                  <div className="content_project_info_vertical">
                    <ProjectInfo vertical={true} id={this.props.match.params.id} />
                    </div>
                  <div className="content_section">
                    <div className="content_project_info">
                    <ProjectInfo id={this.props.match.params.id} />
                    </div>
                    <br/>
                    <Button onClick={this.onSubmit.bind(this)} className = "startButton" variant="success" size="lg">
                        START PROJECT
                    </Button>
                  <br/>
                  <br/>

                  <div className="projectNameFormat">
                    <h2 className="textHeader">{this.state.projectName}</h2>
                  </div>
                  
                  <div>
                    <h2 className="textHeader">Mission</h2>
                    <p className = "insideContent">{ this.state.projectMission }</p>
                  </div>

                  <div>
                    <h2 className="textHeader">Project Video</h2>                    
                    <p className = "insideContent">Project Name : { this.state.projectVideoName }</p>
                    <Player
                      playsInline                      
                      src={this.state.projectVideo}
                    />
                  </div>
                  <hr/>
                  {/* This should be a link later on.. */}
                  <a href="https://www.pinterest.com/" target="_blank">
                    <h5 className="textHeader">
                      <span className = "explore">Explore More</span>
                    </h5>
                  </a>
                  </div>

                </ Container>
            </div>
        )
    }
  }
export default ProjectDetails;  