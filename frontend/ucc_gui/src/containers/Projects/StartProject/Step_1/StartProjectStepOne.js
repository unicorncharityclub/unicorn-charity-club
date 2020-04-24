import React from "react";
import "./StartProjectStepOne.css";
import "../../../ProjectCommon.css";
import AxiosConfig from "../../../../axiosConfig";
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import ProjectContent from "../../../../components/Project/StartProject/Step_1/ProjectContent";
import cookie from "react-cookies";
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import TextTheme from "../../../../components/General/Text/TextTheme";
import TwoButtonLayout from "../../../../components/General/TwoButtonLayout";

class StartProjectStepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.id,
      projectBadge: "",
      projectBanner: "",
      projectName: "",
      projectCategory: "",
      projectVideo: "",
      projectMission: "",
      projectGoal: "",
      projectVideoName: "",
      projectDateStarted: "Date Started",
      video: "",
      userProjectVideo: "",
      userEmail: cookie.load("user_email"),
      errorMessage: "",
    };
  }

  videoHandler = (event) => {
    this.setState({
      video: URL.createObjectURL(event.target.files[0]),
      userProjectVideo: event.target.files[0],
    });
  };

  moveToStepTwoHandler(event) {
    if (this.state.userProjectVideo) {
      let form_data = new FormData();
      form_data.append("project_id", this.state.projectId);
      form_data.append(
        "video",
        this.state.userProjectVideo,
        this.state.userProjectVideo.name
      );

      AxiosConfig.put(`charityproject/start_project/`, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then(
          this.props.history.push(
            `/Projects/${this.state.projectId}/StartProjectStepTwo`
          )
        )
        .catch((error) => console.log(error));
    } else {
      this.setState({ errorMessage: "Please Upload a Video to continue" });
    }
  }

  componentDidMount() {
    const projectId = this.props.match.params.id;
    AxiosConfig.get(`charityproject/${projectId}/`)
      .then((res) => {
        this.setState({
          projectName: res.data["name"],
          projectBanner: res.data["banner"],
          projectBadge: res.data["badge"],
          projectCategory: res.data["category"],
          projectMission: res.data["mission"],
        });
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="header_main">
        <div className="header_step_banner_main">
          <div className="banner_main">
            <div className="banner_main_content">
              <ProjectBanner image={this.state.projectBanner} />
            </div>
          </div>

          <div className="stepper_main">
            <div className="stepper_main_content">
              <ProgressStepper currentStep="0" />
            </div>
          </div>
        </div>

        <div className="page_info_hr_content_main">
          <ProjectInfo id={this.props.match.params.id} />
        </div>

        <div className="page_main">
          <div className="page_info_vr_content_main">
            <ProjectInfo vertical={true} id={this.props.match.params.id} />
          </div>

          <div className="page_details_main">
            <div className="page_details_content_main">
              <ProjectContent
                videoHandler={this.videoHandler.bind(this)}
                video={this.state.video}
              />{" "}
              <br />
              <div>
                <TwoButtonLayout
                  button1Text="SAVE"
                  button2Text="NEXT"
                  button2Click={this.moveToStepTwoHandler.bind(this)}
                />
              </div>
              <div style={{ width: "100%" }}>
                <TextTheme message={this.state.errorMessage} className="text_medium text_red" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartProjectStepOne;
