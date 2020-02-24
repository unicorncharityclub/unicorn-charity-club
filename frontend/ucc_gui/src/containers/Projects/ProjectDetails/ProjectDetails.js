import React from "react";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import { Container } from "@material-ui/core";
import axios from "axios";
import "./ProjectDetails.css";
import Button from 'react-bootstrap/Button'

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
                  
                  <br/>
                  <br/>

                    <Button className = "startButton" variant="success" size="lg">
                        START PROJECT
                    </Button>
                  <br/>
                  <br/>
                  
                  <div>
                    <h2 className="textHeader">Project Mission</h2>
                    <p className = "insideContent">{ this.state.ProjectMission }</p>
                  </div>
                  <div>
                    <h2 className="textHeader">Project Goal</h2>
                    <p className = "insideContent">{ this.state.ProjectGoal }</p>
                  </div>
                  <div>
                    <h2 className="textHeader">Project Video</h2>
                    <p className = "insideContent">{ this.state.ProjectVideo }</p>
                  </div>
                  <hr/>
                  {/* This should be a link later on.. */}
                  <h5 className="textHeader">Explore More</h5>
                </ Container>
            </div>
        )
    }

  }

export default ProjectDetails;  