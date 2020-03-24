import React from 'react';
import "../../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import Button from "react-bootstrap/Button";
import Video from "../../../../../components/General/Video/Video.js"
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
import ProjectInfo from "../../../ProjectHeader/ProjectInfo.js";


class DevelopNewHabitComponent extends React.Component {

    render() {
        return (
            <div className="form-wrapper">
                <ProgressStepper currentStep="3"/>
                <ProjectBanner image={this.props.project_banner}/>
                <ProjectInfo project_name={this.props.project_name} project_badge={this.props.project_badge}
                             project_join_date={this.props.project_join_date}
                             challenge_status={this.props.challenge_status}
                />
                <div className="challenge-name">
                    <label>CHALLENGE 3: Adventure</label>
                </div>
                <div className="project-form">
                    <label>DEVELOP A NEW HABIT</label>
                    <label>Develop a new habit that will support the mission of the project.</label>
                    <div className="project-form-inner">
                        <label>1. What new habit did you develop?</label>
                        <input type="text"
                               name="new_habit"
                               value={this.props.defaultIfEmpty(this.props.new_habit)}
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
                    {/*<label htmlFor="save">Save</label>*/}
                    <Button className="save-button" id="save" variant="contained" type="submit"
                            onClick={(event) => this.props.saveHandler(event, 'post')}>SAVE</Button>
                    <Button className="done-button" id="done" variant="contained" type="submit">DONE</Button>
                </div>
            </div>
        );
    }
}


export default DevelopNewHabitComponent;
