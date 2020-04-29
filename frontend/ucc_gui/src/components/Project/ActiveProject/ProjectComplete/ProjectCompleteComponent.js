import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import Button from "react-bootstrap/Button";
import ProgressStepper from "../../ProgressStepper";
import ProjectBanner from "../../ProjectBanner";
import ProjectInfo from "../../Details/ProjectInfo";
import Project_logo from "../../../../site_media/default-images/project_default.jpg";
import SpreadTheWordSummary from "./SpreadTheWordSummary";
import LearnNewSkillSummary from "./LearnNewSkillSummary";
import DevelopNewHabitSummary from "./DevelopNewHabitSummary";
import VolunteerTimeSummary from "./VolunteerTimeSummary";
import GiveADonationSummary from "./GiveADonationSummary";
import FundraiseSummary from "./FundraiseSummary";

/**
 * @description Displays the prize earned by a user after completion of the project.
 * @class ProjectCompleteComponent
 * @implements ProgressStepper, ProjectBanner, ProjectInfo, SpreadTheWordSummary, LearnNewSkillSummary,
 * DevelopNewHabitSummary, GiveADonationSummary, FundraiseSummary
 * @extends React.Component
 * @type {ProjectCompleteComponent}
 * @example <ProjectCompleteComponent />
 * pre-condition: all the imports
 * post-condition: returns a form with the prize earned by the user.
 * @param project_banner, project_name, project_badge, project_join_date, challenge_status, image, saveHandler
 * @returns {ProjectCompleteComponent}
 */

class ProjectCompleteComponent extends React.Component {

    render() {

        return (
            <div className="header_main">
                <div className="page_info_hr_content_main">
                    <div className="header_step_banner_main">
                        <div className="banner_main">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.props.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="3"/>
                            </div>
                        </div>
                    </div>
                    <ProjectInfo id={this.props.projectId}/>
                </div>
                <div className="page_main">
                    <div className="page_info_vr_content_main">
                        <ProjectInfo vertical={true} id={this.props.projectId}/>
                    </div>

                    <div className="header_step_banner_main_vr">
                        <div className="banner_main_vr">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.props.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main_vr">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="3"/>
                            </div>
                        </div>
                    </div>
                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <div className="challenge-name">
                                <label>CONGRATULATIONS!</label>
                            </div>
                            <div className="project-form">
                                <div className="congratulations-form-inner">
                                    <label>You have completed your project goal and have unlocked the project gift.
                                        Thank you for helping me make a big difference in the world today!</label>
                                    <img src={this.props.image || Project_logo} alt="Avatar"/>
                                </div>
                            </div>
                            <div className="challenge-name">
                                <label>MISSION ACCOMPLISHED</label>
                            </div>
                            <label className="project-name">{this.props.projectName}</label>
                            <label>{this.props.projectMission}</label>
                            <label className="project-name">Accomplishments</label>
                            {
                                (this.props.adventureId === 1) ? <SpreadTheWordSummary invitees={this.props.invitees}
                                                                                       video={this.props.video}/>
                                    : (this.props.adventureId === 2) ?
                                    <LearnNewSkillSummary projectId={this.props.projectId}/>
                                    : (this.props.adventureId === 3) ?
                                        <DevelopNewHabitSummary projectId={this.props.projectId}/>
                                        : (this.props.adventureId === 4) ?
                                            <VolunteerTimeSummary projectId={this.props.projectId}
                                                                  userEmail={this.props.userEmail}/>
                                            : (this.props.adventureId === 5) ?
                                                <GiveADonationSummary projectId={this.props.projectId}
                                                                      userEmail={this.props.userEmail}/>
                                                : (this.props.adventureId === 6) ?
                                                    <FundraiseSummary projectId={this.props.projectId}
                                                                      userEmail={this.props.userEmail}/>
                                                    : ''

                            }
                            <div className="navigate-done">
                                <Button className="done" id="done" variant="contained" type="submit"
                                        onClick={(event) => this.props.saveHandler(event)}>DONE</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ProjectCompleteComponent;
