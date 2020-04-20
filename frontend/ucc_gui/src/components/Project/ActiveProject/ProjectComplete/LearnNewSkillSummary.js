import React from 'react';
import "./ProjectComplete.css";
import "../../../General/Video/Video.css";
import {Player} from "video-react";
import AxiosConfig from "../../../../axiosConfig";

/**
 * @description Creates a summary of the new skill learnt in the challenge
 * @class LearnNewSkillSummary
 * @implements none
 * @extends React.Component
 * @type {LearnNewSkillSummary}
 * @example <LearnNewSkillSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about learning new skill
 * @param newSkill, description, video
 * @returns {LearnNewSkillSummary}
 */

class LearnNewSkillSummary extends React.Component {

        constructor(props) {
        super(props);
        this.state = {
            newSkill: '',
            description: '',
            video: '',
            projectId: ''
        }
    };

    componentDidMount() {

        AxiosConfig.get('charityproject/learn_new_skill/', {params: {project_id: this.props.projectId}})
            .then(res => {
                if (res.data) {
                    this.setState({
                        newSkill: res.data.new_skill,
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
                    <label className="statement">I reached my project goal of learning a new skill that supports the mission of the
                        project:</label>
                    <label>{this.state.newSkill}</label>
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


export default LearnNewSkillSummary;
