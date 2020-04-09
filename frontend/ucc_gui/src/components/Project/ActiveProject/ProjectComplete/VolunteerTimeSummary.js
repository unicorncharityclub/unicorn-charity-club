import React from 'react';
import "./ProjectComplete.css";
import "../../../General/Video/Video.css";
import {Player} from "video-react";


/**
 * @description Creates a summary of the volunteer time served as part of the challenge
 * @class VolunteerTimeSummary
 * @implements none
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
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label className="statement">I reached my project goal of volunteering time at a local organization that supports the
                        mission of the project:</label>
                    <label className="statement">{this.props.name}</label>
                    <label className="statement">{this.props.address}</label>
                    <label className="statement">{this.props.city}, {this.props.state}</label>
                    <label>{this.props.website}</label>
                    <label className="statement">I volunteered a total of {this.props.hours} by doing the following:</label>
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


export default VolunteerTimeSummary;
