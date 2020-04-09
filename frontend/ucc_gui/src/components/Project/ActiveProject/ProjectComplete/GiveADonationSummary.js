import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import {Player} from "video-react";


/**
 * @description Creates a summary of the giving a donation as part of the challenge
 * @class GiveADonationSummary
 * @implements none
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
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label>I reached my project goal of donating to a charitable organization that supports the
                        mission of the project:</label>
                    <label className="statement">I donated to:</label>
                    <label className="statement">{this.props.name}</label>
                    <label className="statement">{this.props.address}</label>
                    <label className="statement">{this.props.city}, {this.props.state}</label>
                    <label>{this.props.website}</label>
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


export default GiveADonationSummary;
