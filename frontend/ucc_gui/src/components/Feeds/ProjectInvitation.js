import React from 'react';
import "./Feeds.css";
import DefaultProfilePic from "../../site_media/default-images/default-profile-pic-feeds.png";

/**
 * @description Displays the prize earned by a user after completion of the project.
 * @class ProjectInvitation
 * @implements ProgressStepper, ProjectBanner, ProjectInfo, SpreadTheWordSummary, LearnNewSkillSummary,
 * DevelopNewHabitSummary, GiveADonationSummary, FundraiseSummary
 * @extends React.Component
 * @type {ProjectInvitation}
 * @example <ProjectInvitation />
 * pre-condition: all the imports
 * post-condition: returns a form with the prize earned by the user.
 * @param project_banner, project_name, project_badge, project_join_date, challenge_status, image, saveHandler
 * @returns {ProjectInvitation}
 */

class ProjectInvitation extends React.Component {

    render() {
        let gender = '';
        if(this.props.gender === 'Male')
            gender = 'his';
        else if(this.props.gender === 'Female')
            gender = 'her';

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
                    <p className="mobile-profile-pic"><img className="profile-pic" src={this.props.profilePic || DefaultProfilePic}/></p>
                    <p className="mobile-intro"><label style={{ fontWeight: 'bold' }}>{this.props.friendsName}</label>
                        <label>{this.props.friendsName} catapulted project on {formattedDate}, {time}</label></p>
                </div>
                <div className="feed-display-pic" style={{backgroundImage: `url(${this.props.projectBanner}`}}>
                </div>
                <div className="feed-form">
                    <label>{this.props.friendsName} is inviting you to join {gender || 'his'} new impact project,
                        {this.props.projectName}, {this.props.projectMission}</label>
                    <label>You can help {gender || 'his'} make a difference by joining the project today.</label>
                </div>
                <div className="navigate-button">
                    <button className="button">View Invitation</button>
                </div>
            </div>
        );
    }
}


export default ProjectInvitation;
