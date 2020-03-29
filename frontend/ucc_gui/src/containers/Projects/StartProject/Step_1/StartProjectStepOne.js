import React from "react";
import "./StartProjectStepOne.css";
import "../../../ProjectCommon.css"
import AxiosConfig from '../../../../axiosConfig'
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import ProjectContent from "../../../../components/Project/StartProject/Step_1/ProjectContent";
import cookie from "react-cookies";
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import AlertMessage from "../../../../components/General/AlertMessage";
import TwoButtonLayout from "../../../../components/General/TwoButtonLayout";


class StartProjectStepOne extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            projectId: this.props.match.params.id,
            projectBadge : '',
            projectBanner : '',
            projectName : '',
            projectCategory : '',
            projectVideo : '',
            projectMission: '',
            projectGoal: '',
            projectVideoName: '',
            projectDateStarted: 'Date Started',
            video:'',
            userProjectVideo: '',
            userEmail: cookie.load('user_email'),
            errorMessage : ''
        }
     }  

    videoHandler = (event) =>{
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            userProjectVideo: event.target.files[0]
        });
    };

     moveToStepTwoHandler(event)
     {
         if(this.state.userProjectVideo){
             let form_data = new FormData();
            form_data.append('project_id', this.state.projectId);
            form_data.append('email', this.state.userEmailId);
            form_data.append('project_video', this.state.userProjectVideo, this.state.userProjectVideo.name);

        AxiosConfig.defaults.withCredentials = true;
        AxiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        AxiosConfig.put(`charityproject/invitationVideo`, form_data,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(this.props.history.push(`/Projects/${this.state.projectId}/StartProjectStepTwo`))
        .catch(error => console.log(error))
         }
         else
         {
             this.setState({errorMessage : "Please Upload a Video to continue"});
         }
     }

    componentDidMount () {
        const projectId = this.props.match.params.id;
        AxiosConfig.get(`charityproject/${projectId}`)
      .then(res => {
              this.setState({
                  projectName : res.data["project_name"],
                  projectBanner : res.data["project_banner"],
                  projectBadge : res.data["project_badge"],
                  projectCategory: res.data["project_category"],
                  projectMission: res.data["project_mission"],
              });
          console.log(res.data)
      }).catch(error => console.log(error))
    }

    render() {
      return(
            <div style={{margin:"10px", marginBottom:"150px"}}>
                <div className="header_step_banner_common">
                    <div className="stepper_common">
                    <ProgressStepper currentStep="1" />
                    </div>
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

                <ProjectContent videoHandler={this.videoHandler.bind(this)}
                                video={this.state.video}/> <br/>

                    <div>
                       <TwoButtonLayout button1Text="SAVE" button2Text="NEXT" button2Click={this.moveToStepTwoHandler.bind(this)}/>
                       </div>
                    <div style={{width:"100%"}}>
                        <AlertMessage alertMessage={this.state.errorMessage} />
                    </div>

                </div>
            </div>
        )
    }
  }

export default StartProjectStepOne;