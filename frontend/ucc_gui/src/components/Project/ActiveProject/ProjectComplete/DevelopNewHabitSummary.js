import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";

/**
 * @description Creates a summary of the new habit adopted in the challenge
 * @class DevelopNewHabitSummary
 * @implements
 * @extends React.Component
 * @type {DevelopNewHabitSummary}
 * @example <DevelopNewHabitSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about developing a new habit
 * @param newHabit, description, video
 * @returns {DevelopNewHabitSummary}
 */

class DevelopNewHabitSummary extends React.Component {


    render() {
        return (
            <div className="project-form">
                <div className="project-form-inner">
                    <label>I reached my project goal of developing a new habit that supports the mission of the
                        project:</label>
                    <label>{this.props.newHabit}</label>
                    <label>{this.props.description}</label>
                    <div>{this.props.video}</div>
                </div>
            </div>
        );
    }
}


export default DevelopNewHabitSummary;
