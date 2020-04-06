import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";


/**
 * @description Creates a summary of the volunteer time served as part of the challenge
 * @class VolunteerTimeSummary
 * @implements
 * @extends React.Component
 * @type {VolunteerTimeSummary}
 * @example <VolunteerTimeSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about volunteer time served
 * @param name, address, city, state, website, hours, description, video
 * @returns {VolunteerTimeSummary}
 */

class VolunteerTimeSummary extends React.Component {


    render() {
        return (
            <div className="project-form">
                <div className="project-form-inner">
                    <label>I reached my project goal of volunteering time at a local organization that supports the
                        mission of the project:</label>
                    <label>{this.props.name}</label>
                    <label>{this.props.address}</label>
                    <label>{this.props.city} {this.props.state}</label>
                    <label>{this.props.website}</label>
                    <label>I volunteered a total of {this.props.hours} by doing the following:</label>
                    <label>{this.props.description}</label>
                    <div>{this.props.video}</div>
                </div>
            </div>
        );
    }
}


export default VolunteerTimeSummary;
