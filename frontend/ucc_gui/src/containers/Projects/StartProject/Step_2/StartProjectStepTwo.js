import React from "react";
import "./StartProjectStepTwo.css";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import GiftGrid from "../../../../components/Project/StartProject/Step_2/GiftGrid";
import AxiosConfig from "../../../../axiosConfig";
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import "../../../ProjectCommon.css";
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import TwoButtonLayout from "../../../../components/General/TwoButtonLayout";
import {withAlert} from "react-alert";

class StartProjectStepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectBanner: "",
            photoSelectedId: "",
            imageList: [
                {
                    prize_id: "",
                    prize_url: "",
                },
            ],
        };
    }

    componentDidMount() {
        this.fetchPrizeDetails(this);
        this.fetchProjectBanner();
    }

    fetchProjectBanner() {
        const project_id = this.props.match.params.id;
        AxiosConfig.get(`charityproject/${project_id}/`)
            .then((res) => {
                this.setState({
                    projectBanner: res.data["banner"],
                });
                //   console.log(res.data)
            })
            .catch((error) => console.log(error));
    }

    setPrizeDetails(response) {
        this.setState((prevState) => ({
            imageList: response.data["image_list"],
        }));
    }

    fetchPrizeDetails(obj) {
        AxiosConfig.get(`prize/prizeList`)
            .then(function (response) {
                obj.setPrizeDetails(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    giftPlanSelectedHandler(value) {
        this.setState((prevState) => ({
            photoSelectedId: value,
        }));
    }

    moveToStepThreeHandler() {
        // if the prize is selected
        if (this.state.photoSelectedId) {
            AxiosConfig.put(`charityproject/start_project/`, {
                project_id: this.props.match.params.id,
                prize: this.state.photoSelectedId,
            })
                .then(
                    this.props.history.push(
                        `/Projects/${this.props.match.params.id}/InviteFriends`
                    )
                )
                .catch((error) => console.log(error));
        } else {
            // show message that need to select one prize to proceed.
            const alert = this.props.alert;
            alert.show("Please select one prize to proceed!", {
                position: "top right",
            });
        }
    }

    render() {
        return (
            <div className="header_main">
                <div className="page_info_hr_content_main">
                    <div className="header_step_banner_main">
                        <div className="banner_main">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.state.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="1"/>
                            </div>
                        </div>
                    </div>
                    <ProjectInfo id={this.props.match.params.id}/>
                </div>

                <div className="page_main">
                    <div className="page_info_vr_content_main">
                        <ProjectInfo vertical={true} id={this.props.match.params.id}/>
                    </div>

                    <div className="header_step_banner_main_vr">
                        <div className="banner_main_vr">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.state.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main_vr">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="1"/>
                            </div>
                        </div>
                    </div>

                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <div>
                                <h2 className="textHeader">PLAN YOUR PROJECT GIFT</h2>
                                <p className="insideContent">
                                    Reward your Project Team with a secret gift when they complete
                                    the Project.
                                </p>
                            </div>
                            <div>
                                {this.state.imageList[0].prize_url ? (
                                    <GiftGrid
                                        prizeData={this.state.imageList}
                                        onClick={this.giftPlanSelectedHandler.bind(this)}
                                    />
                                ) : (
                                    <div/>
                                )}
                            </div>
                            <br/>
                            <div>
                                <TwoButtonLayout
                                    button1Text="BACK"
                                    button2Text="NEXT"
                                    button2Click={this.moveToStepThreeHandler.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert()(StartProjectStepTwo);
