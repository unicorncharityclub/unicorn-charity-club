import React from "react";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import { Container } from "@material-ui/core";
import axios from "axios";

class ProjectDetails extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
          ProjectMission : '',
          ProjectGoal : '',
          ProjectVideo : ''
        }
                       
     }  

    componentDidMount () {
      const project_id = this.props.match.params.id;      
      axios.get(`http://127.0.0.1:8000/charityproject/${project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectMission : res.data.project_mission,
                  ProjectGoal : res.data.project_goal,
                  ProjectVideo : res.data.project_video
              });


          console.log(res.data)
      }).catch(error => console.log(error))
    }
    
    render() {
      return(
            <div>  
              <Container>
                <p> This is Project Details Page </p>                           
                  {console.log(this.props)}
                  <ProjectInfo id={this.props.match.params.id} />
                  <div className="textHeader">                
                      Start a Project
                  </div>
                  <div>
                    <h2>Project Mission</h2>
                    <p>{ this.state.ProjectMission }</p>
                  </div>
                  <div>
                    <h2>Project Goal</h2>
                    <p>{ this.state.ProjectGoal }</p>
                  </div>
                  <div>
                    <h2>Project Video</h2>
                    <p>{ this.state.ProjectVideo }</p>
                  </div>
                </ Container>
            </div>
        )
    }

  }

export default ProjectDetails;  