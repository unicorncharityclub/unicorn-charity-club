import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";


/**
 * @description Creates a summary of the spreading the word as part of the challenge
 * @class SpreadTheWordSummary
 * @implements
 * @extends React.Component
 * @type {SpreadTheWordSummary}
 * @example <SpreadTheWordSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about spreading the word about the project
 * @param invitees, video
 * @returns {SpreadTheWordSummary}
 */

class SpreadTheWordSummary extends React.Component {


    render() {
        return (
            <div className="project-form">
                <div className="project-form-inner">
                    <label>I reached my project goal of spreading the word by inviting the following friends to the
                        project:</label>
                    <div>{this.props.video}</div>

                </div>
            </div>
        );
    }
}


export default SpreadTheWordSummary;
