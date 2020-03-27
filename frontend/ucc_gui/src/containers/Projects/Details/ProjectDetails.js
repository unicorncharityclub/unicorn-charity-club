import React from "react";
import ProjectInfo from "../../../components/Project/Details/ProjectInfo";
import { Container } from "@material-ui/core";
import axiosConfig from '../../../axiosConfig'
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
        const project_id = this.props.match.params.id;

        axiosConfig.defaults.withCredentials = true;
        axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        axiosConfig.post('charityproject/start',
            {"project_id":project_id,
                    "user_emailid": this.state.UserEmailId},
                )
                .then(res => this.props.history.push(`/Projects/${project_id}/StartNewProject`))
                .catch(error => console.log(error))

    }

    constructor(props) {
        super(props); 
        this.state = {
          ProjectMission : '',
          ProjectGoal : '',
          ProjectVideoName : '',
          ProjectVideo : '',
            ProjectBanner: '',
            ProjectName: '',
            UserEmailId: cookie.load('user_emailid')
        }
     }  

    componentDidMount () {
      const project_id = this.props.match.params.id;
      // console.log(project_id)
      axiosConfig.get(`charityproject/${project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectMission : res.data.project_mission,
                  ProjectName: res.data.project_name,
                  ProjectBanner : res.data.project_banner,
                  ProjectGoal : res.data.project_goal,
                  ProjectVideoName : res.data.project_video_name,
                  ProjectVideo : res.data.project_video
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
                    <ProjectBanner image={this.state.ProjectBanner}  />
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
                    <h2 className="textHeader">{this.state.ProjectName}</h2>
                  </div>
                  
                  <div>
                    <h2 className="textHeader">Mission</h2>
                    <p className = "insideContent">{ this.state.ProjectMission }</p>
                  </div>

                  <div>
                    <h2 className="textHeader">Project Video</h2>                    
                    <p className = "insideContent">Project Name : { this.state.ProjectVideoName }</p>
                    <Player
                      playsInline                      
                      src={this.state.ProjectVideo}
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