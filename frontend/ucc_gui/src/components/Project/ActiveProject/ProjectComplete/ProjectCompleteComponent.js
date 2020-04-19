import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import Button from "react-bootstrap/Button";
import ProgressStepper from "../../ProgressStepper";
import ProjectBanner from "../../ProjectBanner";
import ProjectInfo from "../../ProjectHeader/ProjectInfo";
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
            <div className="form-wrapper">
                <div className="mobile-content">
                    <ProgressStepper currentStep="3"/>
                    <ProjectBanner image={this.props.projectBanner}/>
                    <ProjectInfo projectName={this.props.projectName} projectBadge={this.props.projectBadge}
                                 projectCategory={this.props.projectCategory}
                                 projectJoinDate={this.props.projectJoinDate}
                                 challengeStatus={this.props.challengeStatus}
                    />
                </div>
                <div className="adventure-project">
                    <div className="desktop-content-header">
                        <ProjectInfo projectName={this.props.projectName} projectBadge={this.props.projectBadge}
                                     projectJoinDate={this.props.projectJoinDate}
                                     challengeStatus={this.props.challengeStatus}
                                     projectMission={this.props.projectMission}
                        />
                    </div>
                    <div className="project-header-content">
                        <div className="desktop-content">
                            {(this.props.projectBanner) ?
                                <div className="project-banner">
                                    <ProjectBanner image={this.props.projectBanner}/>
                                </div> : ''
                            }
                            <ProgressStepper currentStep="3"/>
                        </div>
                        <div className="project-content">
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
                                    <LearnNewSkillSummary newSkill={this.props.newSkill}
                                                          description={this.props.description}
                                                          video={this.props.video}/>
                                    : (this.props.adventureId === 3) ?
                                        <DevelopNewHabitSummary newHabit={this.props.newHabit}
                                                                description={this.props.description}
                                                                video={this.props.video}/>
                                        : (this.props.adventureId === 4) ?
                                            <VolunteerTimeSummary name={this.props.organisationName}
                                                                  address={this.props.organisationAddress}
                                                                  city={this.props.organisationCity}
                                                                  state={this.props.organisationState}
                                                                  website={this.props.organisationWebsite}
                                                                  hours={this.props.volunteerHours}
                                                                  description={this.props.description}
                                                                  video={this.props.video}/>
                                            : (this.props.adventureId === 5) ?
                                                <GiveADonationSummary name={this.props.organisationName}
                                                                      address={this.props.organisationAddress}
                                                                      city={this.props.organisationCity}
                                                                      state={this.props.organisationState}
                                                                      website={this.props.organisationWebsite}
                                                                      description={this.props.description}
                                                                      video={this.props.video}/>
                                                : (this.props.adventureId === 6) ?
                                                    <FundraiseSummary name={this.props.organisationName}
                                                                      address={this.props.organisationAddress}
                                                                      city={this.props.organisationCity}
                                                                      state={this.props.organisationState}
                                                                      website={this.props.organisationWebsite}
                                                                      description={this.props.description}
                                                                      video={this.props.video}/> :
                                                    ''

                            }
                            <div className="navigate-done">
                                <Button className="done" id="done" variant="contained" type="submit"
                                        onClick={(event) => this.props.saveHandler(event, 'post')}>DONE</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ProjectCompleteComponent;
