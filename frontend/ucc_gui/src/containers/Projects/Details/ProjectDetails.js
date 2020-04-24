import React from "react";
import ProjectInfo from "../../../components/Project/Details/ProjectInfo";
import AxiosConfig from "../../../axiosConfig";
import "./ProjectDetails.css";
import Button from "react-bootstrap/Button";
import "../../../../node_modules/video-react/dist/video-react.css";
import {Player} from "video-react";
import cookie from "react-cookies";
import "../../ProjectCommon.css";
import ProjectBanner from "../../../components/Project/ProjectBanner";

class ProjectDetails extends React.Component {
    onSubmit() {
        const projectId = this.props.match.params.id;
        let form_data = new FormData();
        form_data.append("project_id", this.props.match.params.id);
        AxiosConfig.post("charityproject/start/", form_data)
            .then((res) =>
                this.props.history.push(`/Projects/${projectId}/StartNewProject`)
            )
            .catch((error) => console.log(error));
    }

    constructor(props) {
        super(props);
        this.state = {
            projectMission: "",
            projectGoal: "",
            projectVideoName: "",
            projectVideo: "",
            projectBanner: "",
            projectName: "",
            userEmail: cookie.load("user_email"),
        };
    }

    componentDidMount() {
        const projectId = this.props.match.params.id;
        AxiosConfig.get(`charityproject/${projectId}/`)
            .then((res) => {
                this.setState({
                    projectMission: res.data.mission,
                    projectName: res.data.name,
                    projectBanner: res.data.banner,
                    projectGoal: res.data.goal,
                    projectVideoName: res.data.project_video_name,
                    projectVideo: res.data.video,
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div className="header_main">
                <div className="page_info_hr_content_main">
                    <div className="header_banner_main">
                        <div className="only_banner_main">
                            <ProjectBanner image={this.state.projectBanner}/>
                        </div>
                    </div>
                    <ProjectInfo id={this.props.match.params.id}/>
                </div>

                <div className="page_main">
                    <div className="page_info_vr_content_main">
                        <ProjectInfo vertical={true} id={this.props.match.params.id}/>
                    </div>

                    <div className="header_banner_main_vr">
                        <div className="only_banner_main">
                            <ProjectBanner image={this.state.projectBanner}/>
                        </div>
                    </div>

                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <Button
                                onClick={this.onSubmit.bind(this)}
                                className="startButton"
                                variant="success"
                                size="lg"
                            >
                                START PROJECT
                            </Button>
                            <br/>
                            <br/>

                            <div className="projectNameFormat">
                                <h2 className="textHeader">{this.state.projectName}</h2>
                            </div>

                            <div>
                                <h2 className="textHeader">Mission</h2>
                                <p className="insideContent">{this.state.projectMission}</p>
                            </div>

                            <div>
                                <h2 className="textHeader">Project Video</h2>
                                <p className="insideContent">
                                    Project Name : {this.state.projectVideoName}
                                </p>
                                <Player playsInline src={this.state.projectVideo}/>
                            </div>
                            <hr/>
                            {/* This should be a link later on.. */}
                            <a href="https://www.pinterest.com/" target="_blank">
                                <h5 className="textHeader">
                                    <span className="explore">Explore More</span>
                                </h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectDetails;
