import React from 'react';
import "./Feeds.css";
import DefaultProfilePic from "../../site_media/default-images/default-profile-pic-feeds.png";
import {Player} from "video-react";

/**
 * @description Displays the project completed by a friend of the user in the feed.
 * @class FriendCompletedProject
 * @implements none
 * @extends React.Component
 * @type {FriendCompletedProject}
 * @example <FriendCompletedProject />
 * pre-condition: all the imports
 * post-condition: returns a form with the message of project completed by a friend of the user.
 * @param profilePic, friendsName, video, projectName, time
 * @returns {FriendCompletedProject}
 */

class FriendCompletedProject extends React.Component {

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
                    <p className="mobile-profile-pic"><img className="profile-pic"
                                                           src={this.props.profilePic || DefaultProfilePic}/></p>
                    <p className="mobile-intro"><label style={{fontWeight: 'bold'}}>{this.props.friendsName}</label>
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
                    <label>Woo-hoo! {this.props.friendsName} just completed your impact
                        project, {this.props.projectName}!</label>
                </div>
            </div>
        );
    }
}


export default FriendCompletedProject;
