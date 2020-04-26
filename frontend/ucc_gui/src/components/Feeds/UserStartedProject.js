import React from 'react';

/**
 * @description Displays the project started by the user.
 * @class UserStartedProject
 * @implements none
 * @extends React.Component
 * @type {UserStartedProject}
 * @example <UserStartedProject />
 * pre-condition: all the imports
 * post-condition: returns a form with the project started by the user.
 * @param profilePic, userName, time, projectbadge, projectName
 * @returns {UserStartedProject}
 */

class UserStartedProject extends React.Component {

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
                        <label>Project was started on {formattedDate}, {time}</label></p>
                </div>
                <div className="feed-display-adjacent">
                    <p><img className="display-pic-adjacent" src={this.props.profilePic}/></p>
                    <p><img className="display-pic-adjacent" src={this.props.projectBadge}/></p>
                </div>
                <div className="feed-form">
                    <label>Congratulations! You have just started the impact project,
                        {this.props.projectName}. Lets get working on achieving your project impact goals today!</label>
                </div>
            </div>
        );
    }
}


export default UserStartedProject;
