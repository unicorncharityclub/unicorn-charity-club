import React from 'react';
import "./Feeds.css";
import DefaultProfilePic from "../../site_media/default-images/default-profile-pic-feeds.png";
import {Player} from "video-react";

/**
 * @description Displays the prize earned by a user after completion of the project.
 * @class UserCompletedProject
 * @implements ProgressStepper, ProjectBanner, ProjectInfo, SpreadTheWordSummary, LearnNewSkillSummary,
 * DevelopNewHabitSummary, GiveADonationSummary, FundraiseSummary
 * @extends React.Component
 * @type {UserCompletedProject}
 * @example <UserCompletedProject />
 * pre-condition: all the imports
 * post-condition: returns a form with the prize earned by the user.
 * @param project_banner, project_name, project_badge, project_join_date, challenge_status, image, saveHandler
 * @returns {UserCompletedProject}
 */

class UserCompletedProject extends React.Component {

    render() {
        let event = new Date(this.props.time);
        const formattedDate = Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }).format(event);
        const time = event.toLocaleTimeString('en-US');

        return (
            <div className="feed-wrapper">
                <div className="feed-form">
                    <p className="mobile-profile-pic"><img className="profile-pic" src={this.props.profilePic}/></p>
                    <p className="mobile-intro"><label style={{fontWeight: 'bold'}}>{this.props.userName}</label>
                        <label>Project was completed on {formattedDate}, {time}</label></p>
                </div>
                <div className="feed-display-video" style={{width: this.props.width}}>{
                    (this.props.video) ?
                        <div style={{width: this.props.width}}>
                            <Player className="video-player" fluid={false}
                                    playsInline src={this.props.video}
                            />
                        </div> : ''
                }</div>
                <div className="feed-form">
                    <label>Yay! You just completed your impact project, {this.props.projectName}. Time to
                        celebrate!</label>
                </div>
            </div>
        );
    }
}


export default UserCompletedProject;
