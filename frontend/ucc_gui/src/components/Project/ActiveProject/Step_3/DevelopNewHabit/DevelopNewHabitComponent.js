import React from 'react';
import "../../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import Video from "../../../../../components/General/Video/Video.js"
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import ProjectInfo from "../../../ProjectHeader/ProjectInfo.js";
import TwoButtonLayout from "../../../../General/TwoButtonLayout";

/**
 * @description Creates a form displaying all the information of the Challenge 3 Develop new habit
 * @class DevelopNewHabitComponent
 * @implements ProgressStepper, ProjectBanner, ProjectInfo, Video
 * @extends React.Component
 * @type {DevelopNewHabitComponent}
 * @example <DevelopNewHabitComponent />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about develop new habit
 * @param project_banner, project_name, project_badge, project_join_date, challenge_status, new_habit, description,
 * changeHandler, videoHandler, saveHandler
 * @returns {DevelopNewHabitComponent}
 */

class DevelopNewHabitComponent extends React.Component {

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
                                     projectCategory={this.props.projectCategory}
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
                                <label>CHALLENGE 3: Adventure</label>
                            </div>
                            <div className="project-form">
                                <label>DEVELOP A NEW HABIT</label>
                                <label>Develop a new habit that will support the mission of the project.</label>
                                <div className="project-form-inner">
                                    <label>1. What new habit did you develop?</label>
                                    <input type="text"
                                           name="newHabit"
                                           value={this.props.defaultIfEmpty(this.props.newHabit)}
                                           onChange={this.props.changeHandler.bind(this)}/>
                                    <label>2. Describe how you learned your new habit.</label>
                                    <textarea name="description"
                                              value={this.props.defaultIfEmpty(this.props.description)}
                                              onChange={this.props.changeHandler.bind(this)}/>
                                    <label>3. Share a video or photo that celebrates your new habit.</label>
                                </div>
                            </div>
                            <Video src={this.props.video}
                                   id="file" style={{display: 'none'}}
                                   type="file"
                                   name="video"
                                   accept="video/*"
                                   onChange={this.props.videoHandler.bind(this)}/>
                            <div className="navigate-save">
                                <TwoButtonLayout button1Text="SAVE" button2Text="DONE"
                                                 button1Click={(event) => this.props.saveHandler(event, 'post')}
                                                 button2Click={(event) => this.props.saveHandler(event, 'post')}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DevelopNewHabitComponent;
