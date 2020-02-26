import React from "react";
import axios from "axios";
import {Container} from "@material-ui/core";
import ProjectInfo from "../../components/Project/ProjectDetails/ProjectInfo";
import Button from "react-bootstrap/Button";
import {Player} from "video-react";

class StartNewProject extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          ShareYourStory : '',
          ProjectVideoName : '',
          ProjectVideo : ''
        }
     }

     onChange(e){
      let files= e.target.files;
      console.warn("data file", files)
     }

     componentDidMount () {
      const project_id = this.props.match.params.id;
      axios.get(`http://127.0.0.1:8000/charityproject/${project_id}/StartNewProject`)
      .then(res => {
              this.setState({
                  ProjectVideoName : res.data.project_video_name,
                  ProjectVideo : res.data.project_video
              });


          console.log(res.data)
      }).catch(error => console.log(error))
    }

  render() {
    return (
    <div>
              <Container>

                  <div>
                    <h2 className="textHeader">Share Your Story</h2>
                    <p> Create a personal video that tells your friends and family about your new project. Be sure to:
                    <ul>
                        <li>Explain why you chose this project.</li>
                        <li>Explain why people should support the project mission.</li>
                        <li>Ask your friends and family to join your project. </li>
                    </ul>
                    </p>
                  </div>

                  <div>
                        <input type="file" name="file" onChange={(e)=>this.onChange(e)}/>
                  </div>

                <br/>
                <br/>
                  <Button className = "backButton" variant="light" size="lg"> BACK </Button>
                  <Button className = "nextButton" variant="success" size="lg"> NEXT </Button>

                </ Container>
            </div>
        )
    }
}


export default StartNewProject;
