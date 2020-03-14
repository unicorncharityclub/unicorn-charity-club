import React from "react";
import "./StartProjectStepOne.css";
import axiosConfig from '../../../axiosConfig'
import ProjectBanner from "../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import ProjectContent from "../../../components/Project/ProjectStepOne/ProjectContent";
import cookie from "react-cookies";
import Button from "react-bootstrap/Button";
import ProgressStepper from "../../../components/Project/ProgressStepper";
import TextBlue from "../../../components/General/TextBlue";
import TextWhite from "../../../components/General/TextWhite";
import AlertMessage from "../../../components/AlertMessage";



class StartProjectStepOne extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            ProjectId: this.props.match.params.id,
            ProjectBadge : '',
            ProjectBanner : '',
            ProjectName : '',
            ProjectCategory : '',
            ProjectVideo : '',
            ProjectMission: '',
            ProjectGoal: '',
            ProjectVideoName: '',
            ProjectDateStarted: 'Date Started',
            UserProjectVideo: '',
            UserEmailId: cookie.load('user_emailid'),
            ErrorMessage : ''
        }
     }  

     videoHandler(event){
        this.setState({ErrorMessage : ""});
      this.setState({
            UserProjectVideo : event.target.files[0]
        });
     }

     moveToStepTwoHandler(event)
     {
         if(this.state.UserProjectVideo){
             let form_data = new FormData();
            form_data.append('ProjectId', this.state.ProjectId);
            form_data.append('Email', this.state.UserEmailId);
            form_data.append('ProjectVideo', this.state.UserProjectVideo, this.state.UserProjectVideo.name);

        axiosConfig.defaults.withCredentials = true;
        axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        axiosConfig.put(`charityproject/invitationVideo`, form_data,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(this.props.history.push(`/Projects/${this.state.ProjectId}/StartProjectStepTwo`))
        .catch(error => console.log(error))
         }
         else
         {
             this.setState({ErrorMessage : "Please Upload a Video to continue"});
         }
     }

    componentDidMount () {
        const project_id = this.props.match.params.id;
        axiosConfig.get(`charityproject/${project_id}`)
      .then(res => {
              this.setState({
                  ProjectName : res.data["project_name"],
                  ProjectBanner : res.data["project_banner"],
                  ProjectBadge : res.data["project_badge"],
                  ProjectCategory: res.data["project_category"],
                  ProjectMission: res.data["project_mission"],

              });
          console.log(res.data)
      }).catch(error => console.log(error))
    }

    render() {
      return(
            <div style={{margin:"10px", marginBottom:"150px"}}>
                <div className="headerStepBanner">
                    <div className="stepper" >
                        <ProgressStepper currentStep="0" />
                    </div>
                    <div className="banner">
                        <ProjectBanner image={this.state.ProjectBanner}  />
                    </div>
                </div>

                <ProjectInfo id={this.state.ProjectId} />

                <ProjectContent videoHandler={this.videoHandler.bind(this)}
                                userProjectVideo={this.state.UserProjectVideo}/>
                <div style={{width:"60%", float:"right", alignText:"left", marginBottom:"10px"}}>
                    <Button style={{ borderRadius : "50px 0px 0px 50px", backgroundColor:"white", border:"2px solid"}} className = "backButton" variant="light" size="lg">
                        <TextBlue message="SAVE "/>
                    </Button>
                    <Button style={{ borderRadius : "0px 50px 50px 0px", border:"2px solid black"}} className = "nextButton" variant="success" size="lg" onClick={this.moveToStepTwoHandler.bind(this)}>
                        <TextWhite message="NEXT "/>
                    </Button>
                    <div style={{width:"100%"}}>
                        <AlertMessage alertMessage={this.state.ErrorMessage} />
                    </div>
                </div>
            </div>
        )
    }
  }

export default StartProjectStepOne;