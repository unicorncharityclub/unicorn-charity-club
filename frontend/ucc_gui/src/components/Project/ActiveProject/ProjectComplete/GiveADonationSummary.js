import React from 'react';
import "../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import {Player} from "video-react";
import AxiosConfig from "../../../../axiosConfig";


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

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            userEmail: this.props.userEmail,
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
        AxiosConfig.get(`charityproject/give_donation/`, {
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
                    description: res.data.details,
                    video: res.data.exp_video
                });
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label>I reached my project goal of donating to a charitable organization that supports the
                        mission of the project:</label>
                    <label className="statement">I donated to:</label>
                    <label className="statement">{this.state.name}</label>
                    <label className="statement">{this.state.address}</label>
                    <label className="statement">{this.state.city}, {this.state.stateName}</label>
                    <label>{this.state.website}</label>
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


export default GiveADonationSummary;
