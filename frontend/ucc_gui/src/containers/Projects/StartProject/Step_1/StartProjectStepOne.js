import React from "react";
import "./StartProjectStepOne.css";
import "../../../ProjectCommon.css"
import axiosConfig from '../../../../axiosConfig'
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import ProjectContent from "../../../../components/Project/StartProject/Step_1/ProjectContent";
import cookie from "react-cookies";
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import TextBlue from "../../../../components/General/Text/TextBlue";
import TextWhite from "../../../../components/General/Text/TextWhite";
import AlertMessage from "../../../../components/General/AlertMessage";
import TwoButtonLayout from "../../../../components/General/TwoButtonLayout";



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
            video:'',
            UserProjectVideo: '',
            UserEmailId: cookie.load('user_emailid'),
            ErrorMessage : ''
        }
     }  

    videoHandler = (event) =>{
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            UserProjectVideo: event.target.files[0]
        });
    };

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
                <div className="header_step_banner_common">
                    <div className="stepper_common">
                    <ProgressStepper currentStep="1" />
                    </div>
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

                <ProjectContent videoHandler={this.videoHandler.bind(this)}
                                video={this.state.video}/> <br/>

                    <div>
                       <TwoButtonLayout button1Text="SAVE" button2Text="NEXT" button2Click={this.moveToStepTwoHandler.bind(this)}/>
                       </div>
                    <div style={{width:"100%"}}>
                        <AlertMessage alertMessage={this.state.ErrorMessage} />
                    </div>

                </div>
            </div>
        )
    }
  }

export default StartProjectStepOne;