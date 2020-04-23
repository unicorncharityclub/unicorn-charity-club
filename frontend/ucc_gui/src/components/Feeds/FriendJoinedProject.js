import React from 'react';
import "./Feeds.css";
import DefaultProfilePic from "../../site_media/default-images/default-profile-pic-feeds.png";

/**
 * @description Displays the prize earned by a user after completion of the project.
 * @class FriendJoinedProject
 * @implements ProgressStepper, ProjectBanner, ProjectInfo, SpreadTheWordSummary, LearnNewSkillSummary,
 * DevelopNewHabitSummary, GiveADonationSummary, FundraiseSummary
 * @extends React.Component
 * @type {FriendJoinedProject}
 * @example <FriendJoinedProject />
 * pre-condition: all the imports
 * post-condition: returns a form with the prize earned by the user.
 * @param project_banner, project_name, project_badge, project_join_date, challenge_status, image, saveHandler
 * @returns {FriendJoinedProject}
 */

class FriendJoinedProject extends React.Component {

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
                    <p><img className="profile-pic" src={this.props.friendsProfilePic || DefaultProfilePic}/></p>
                    <p><label style={{ fontWeight: 'bold' }}>{this.props.friendsName}</label>
                        <label>{this.props.friendsName} joined project on {formattedDate}, {time}</label></p>
                </div>
                <div className="feed-display-adjacent">
                    <p><img className="display-pic-adjacent" src={this.props.friendsProfilePic || DefaultProfilePic}/></p><
                    p><img className="display-pic-adjacent" src={this.props.projectBadge}/></p>
                </div>
                <div className="feed-form">
                    <label>{this.props.friendsName} just joined your impact project, {this.props.projectName}</label>
                    <label>The more people that join your project, the bigger your impact will be together. Keep up the
                        good work!</label>
                </div>
            </div>
        );
    }
}


export default FriendJoinedProject;
