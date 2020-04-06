import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";


/**
 * @description Creates a summary of the giving a donation as part of the challenge
 * @class GiveADonationSummary
 * @implements
 * @extends React.Component
 * @type {GiveADonationSummary}
 * @example <GiveADonationSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about giving a donation
 * @param name, address, city, state, website, hours, description, video
 * @returns {GiveADonationSummary}
 */

class GiveADonationSummary extends React.Component {


    render() {
        return (
            <div className="project-form">
                <div className="project-form-inner">
                    <label>I reached my project goal of donating to a charitable organization that supports the
                        mission of the project:</label>
                    <label>I donated to:</label>
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


export default GiveADonationSummary;
