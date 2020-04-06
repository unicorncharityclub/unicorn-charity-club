import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";


/**
 * @description Creates a summary of the fundraising as part of the challenge
 * @class FundraiseSummary
 * @implements
 * @extends React.Component
 * @type {FundraiseSummary}
 * @example <FundraiseSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about fundraising
 * @param name, address, city, state, website, hours, description, video
 * @returns {FundraiseSummary}
 */

class FundraiseSummary extends React.Component {


    render() {
        return (
            <div className="project-form">
                <div className="project-form-inner">
                    <label>I reached my project goal of fundraising for a charitable organization that supports the
                        mission of the project:</label>
                    <label>I fundraised for:</label>
                    <label>{this.props.name}</label>
                    <label>{this.props.address}</label>
                    <label>{this.props.city} {this.props.state}</label>
                    <label>{this.props.website}</label>
                    <label>{this.props.description}</label>
                    <div>{this.props.video}</div>
                </div>
            </div>
        );
    }
}


export default FundraiseSummary;
