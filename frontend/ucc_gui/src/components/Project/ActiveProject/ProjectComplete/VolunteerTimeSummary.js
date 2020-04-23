import React from 'react';
import "./ProjectComplete.css";
import "../../../General/Video/Video.css";
import {Player} from "video-react";
import AxiosConfig from "../../../../axiosConfig";


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

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            userEmail: this.props.userEmail,
            hours: '',
            description: '',
            video: '',
            name: '',
            address: '',
            city: '',
            stateName: '',
            website: ''
        }
    }

    componentDidMount() {
        AxiosConfig.get(`charityproject/volunteer_time/`, {
            params: {
                project_id: this.state.projectId,
                user_email: this.state.userEmail
            }
        })
            .then(res => {
                this.setState({
                    name: res.data.organisation_name,
                    address: res.data.organisation_address,
                    city: res.data.organisation_city,
                    website: res.data.website,
                    stateName: res.data.organisation_state,
                    hours: res.data.hours,
                    description: res.data.description,
                    video: res.data.exp_video
                });
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label className="statement">I reached my project goal of volunteering time at a local organization
                        that supports the
                        mission of the project:</label>
                    <label className="statement">{this.state.name}</label>
                    <label className="statement">{this.state.address}</label>
                    <label className="statement">{this.state.city}, {this.state.stateName}</label>
                    <label>{this.state.website}</label>
                    <label className="statement">I volunteered a total of {this.state.hours} by doing the
                        following:</label>
                    <label>{this.state.description}</label>
                    <div className="project-video-preview" style={{width: this.props.width}}>{
                        (this.state.video) ?
                            <div style={{width: this.props.width}}>
                                <Player className="video-upload-preview" fluid={false}
                                        playsInline src={this.state.video}
                                />
                            </div> : ''
                    }</div>
                </div>
            </div>
        );
    }
}


export default VolunteerTimeSummary;
