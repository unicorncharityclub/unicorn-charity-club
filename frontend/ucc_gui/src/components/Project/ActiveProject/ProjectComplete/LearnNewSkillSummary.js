import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";

/**
 * @description Creates a summary of the new skill learnt in the challenge
 * @class LearnNewSkillSummary
 * @implements
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
            <div className="project-form">
                <div className="project-form-inner">
                    <label>I reached my project goal of learning a new skill that supports the mission of the
                        project:</label>
                    <label>{this.props.newSkill}</label>
                    <label>{this.props.description}</label>
                    <div>{this.props.video}</div>
                </div>
            </div>
        );
    }
}


export default LearnNewSkillSummary;
