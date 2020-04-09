import React from 'react';
import "./ProjectComplete.css";
import "../../../General/Video/Video.css";
import {Player} from "video-react";


/**
 * @description Creates a summary of the spreading the word as part of the challenge
 * @class SpreadTheWordSummary
 * @implements none
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
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label className="statement">I reached my project goal of spreading the word by inviting the
                        following friends to the
                        project:</label>
                    {this.props.invitees.map(item => (
                        <label className="statement">{item}</label>
                    ))}
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


export default SpreadTheWordSummary;
