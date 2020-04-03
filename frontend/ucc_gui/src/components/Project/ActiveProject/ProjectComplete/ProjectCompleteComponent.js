import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import Button from "react-bootstrap/Button";
import ProgressStepper from "../../ProgressStepper";
import ProjectBanner from "../../ProjectBanner";
import ProjectInfo from "../../ProjectHeader/ProjectInfo";
import Project_logo from "../../../../site_media/default-images/project_default.jpg";

/**
 * @description Displays the prize earned by a user after completion of the project.
 * @class ProjectCompleteComponent
 * @implements ProgressStepper, ProjectBanner, ProjectInfo
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
                            <div className="project-banner">
                                <ProjectBanner image={this.props.projectBanner}/>
                            </div>
                            <ProgressStepper currentStep="3"/>
                        </div>
                        <div className="project-content">
                            <div className="challenge-name">
                                <label>CONGRATULATIONS!</label>
                            </div>
                            <div className="project-form">
                                <div className="project-form-inner">
                                    <label>You have completed your project goal and have unlocked the project gift.
                                        Thank you for helping me make a big difference in the world today!</label>
                                    <img src={this.props.image || Project_logo} alt="Avatar"/>
                                </div>
                            </div>
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
