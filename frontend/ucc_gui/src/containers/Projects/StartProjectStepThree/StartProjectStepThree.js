import React from "react";
import "./StartProjectStepThree.css";
import axios from "axios";
import ProjectBanner from "../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import cookie from "react-cookies";
import ProgressStepper from "../../../components/Project/ProgressStepper";
import InviteFriends from "../../../components/InviteFriends/ImageFriends";


class StartProjectStepThree extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            ProjectId: this.props.match.params.id,
            ProjectBanner : '',
            ProjectName : '',
            ProjectDateStarted: 'Date Started',
            UserEmailId: cookie.load('user_emailid')
        }
     }  

    componentDidMount () {
        const project_id = this.props.match.params.id;
        axios.get(`http://127.0.0.1:8000/charityproject/${project_id}`)
      .then(res => {
              this.setState({
                  ProjectName : res.data["project_name"],
                  ProjectBanner : res.data["project_banner"],
              });
          console.log(res.data)
      }).catch(error => console.log(error))
    }

    render() {
      return(
            <div style={{margin:"10px", marginBottom:"150px"}}>
                <div className="headerStepBanner">
                    <div className="stepper" >
                        <ProgressStepper currentStep="2" />
                    </div>
                    <div className="banner">
                        <ProjectBanner image={this.state.ProjectBanner}  />
                    </div>
                </div>

                <ProjectInfo id={this.state.ProjectId} />

                <InviteFriends />

            </div>
        )
    }
  }

export default StartProjectStepThree;