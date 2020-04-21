import React from 'react';
import "./ProjectComplete.css";
import "../../../General/Video/Video.css";
import {Player} from "video-react";
import AxiosConfig from "../../../../axiosConfig";

/**
 * @description Creates a summary of the new habit adopted in the challenge
 * @class DevelopNewHabitSummary
 * @implements none
 * @extends React.Component
 * @type {DevelopNewHabitSummary}
 * @example <DevelopNewHabitSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about developing a new habit
 * @param newHabit, description, video
 * @returns {DevelopNewHabitSummary}
 */

class DevelopNewHabitSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newHabit: '',
            description: '',
            video: '',
            projectId: ''
        }
    };

    componentDidMount() {

        AxiosConfig.get('charityproject/develop_new_habit/', {params: {project_id: this.props.projectId}})
            .then(res => {
                if (res.data) {
                    this.setState({
                        newHabit: res.data.new_habit,
                        description: res.data.description,
                        video: res.data.video
                    });
                }
                console.log(res.data);
            }).catch(error => console.log(error))
    };

    render() {
        return (
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label className="statement">I reached my project goal of developing a new habit that supports the
                        mission of the
                        project:</label>
                    <label>{this.state.newHabit}</label>
                    <label>{this.state.description}</label>
                    <div className="project-video-preview" style={{width: this.props.width}}>{
                        (this.state.video) ?
                            <div style={{width: this.props.width}}>
                                <Player className="video-upload-preview" fluid={false}
                                        playsInline src={this.state.video}
                                />
                            </div> : ''
                    }</div>
                </div>
            </div>
        );
    }
}


export default DevelopNewHabitSummary;
