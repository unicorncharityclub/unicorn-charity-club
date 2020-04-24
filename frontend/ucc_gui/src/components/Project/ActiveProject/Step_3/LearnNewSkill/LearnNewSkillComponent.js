import React from 'react';
import "../../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import Video from "../../../../General/Video/Video";
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import TwoButtonLayout from "../../../../General/TwoButtonLayout";
import ProjectInfo from "../../../Details/ProjectInfo";

/**
 * @description Creates a form displaying all the information of the Challenge 3 Learn new skill
 * @class LearnNewSkillComponent
 * @implements ProgressStepper, ProjectBanner, ProjectInfo, Video
 * @extends React.Component
 * @type {LearnNewSkillComponent}
 * @example <LearnNewSkillComponent />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about learning new skill
 * @param project_banner, project_name, project_badge, project_join_date, challenge_status, newSkill, description,
 * changeHandler, videoHandler, saveHandler
 * @returns {LearnNewSkillComponent}
 */

class LearnNewSkillComponent extends React.Component {


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
                                <ProgressStepper currentStep="2"/>
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
                                <ProgressStepper currentStep="2"/>
                            </div>
                        </div>
                    </div>
                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <div className="challenge-name">
                                <label>CHALLENGE 3: Adventure</label>
                            </div>
                            <div className="project-form">
                                <label>LEARN A NEW SKILL</label>
                                <label>Develop a new skill that will support the mission of the project.</label>
                                <div className="project-form-inner">
                                    <label>1. What new skill did you develop?</label>
                                    <input type="text"
                                           name="newSkill"
                                           value={this.props.defaultIfEmpty(this.props.newSkill)}
                                           onChange={this.props.changeHandler.bind(this)}/>
                                    <label>2. Describe how you learned your new skill.</label>
                                    <textarea name="description"
                                              value={this.props.defaultIfEmpty(this.props.description)}
                                              onChange={this.props.changeHandler.bind(this)}/>
                                    <label>3. Share a video or photo that celebrates your new skill.</label>
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
                                                 button1Click={(event) => this.props.saveHandler(event, 'save')}
                                                 button2Click={(event) => this.props.saveHandler(event, 'done')}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*</div>*/}
            </div>
        );
    }
}


export default LearnNewSkillComponent;
