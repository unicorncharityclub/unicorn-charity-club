import React from 'react';
import "./Feeds.css";
import DefaultProfilePic from "../../site_media/default-images/default-profile-pic-feeds.png";

/**
 * @description Displays the prize earned by a user after completion of the project.
 * @class UserSetGoal
 * @implements ProgressStepper, ProjectBanner, ProjectInfo, SpreadTheWordSummary, LearnNewSkillSummary,
 * DevelopNewHabitSummary, GiveADonationSummary, FundraiseSummary
 * @extends React.Component
 * @type {UserSetGoal}
 * @example <UserSetGoal />
 * pre-condition: all the imports
 * post-condition: returns a form with the prize earned by the user.
 * @param project_banner, project_name, project_badge, project_join_date, challenge_status, image, saveHandler
 * @returns {UserSetGoal}
 */

class UserSetGoal extends React.Component {

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
                    <p className="mobile-profile-pic"><img className="profile-pic" src={this.props.profilePic || DefaultProfilePic}/></p>
                    <p className="mobile-intro"><label style={{ fontWeight: 'bold' }} >{this.props.userName}</label>
                        <label>Project impact goal set on {formattedDate}, {time}</label></p>
                </div>
                <div className="feed-display">
                    <p>{this.props.goalName} that supports the mission.</p>
                </div>
                <div className="feed-form">
                    <label>You just set a goal and date for your impact project, </label>
                    <label>PROJECT NAME: {this.props.projectName}</label>
                    <label>GOAL: {this.props.goalName} that supports the mission.</label>
                </div>
            </div>
        );
    }
}


export default UserSetGoal;
