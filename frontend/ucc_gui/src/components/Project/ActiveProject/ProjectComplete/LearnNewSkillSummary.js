import React from 'react';
import "./ProjectComplete.css";
import "../../../General/Video/Video.css";
import {Player} from "video-react";

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


    render() {
        return (
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label className="statement">I reached my project goal of learning a new skill that supports the mission of the
                        project:</label>
                    <label>{this.props.newSkill}</label>
                    <label>{this.props.description}</label>
                    <div className="project-video-preview" style={{width: this.props.width}}>{
                        (this.props.video) ?
                            <div style={{width: this.props.width}}>
                                <Player className="video-upload-preview" fluid={false}
                                        playsInline src={this.props.video}
                                />
                            </div> : ''
                    }</div>
                </div>
            </div>
        );
    }
}


export default LearnNewSkillSummary;
