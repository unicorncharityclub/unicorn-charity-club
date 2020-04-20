import React from 'react';
import "./ProjectComplete.css";
import "../../../General/Video/Video.css";
import {Player} from "video-react";
import AxiosConfig from "../../../../axiosConfig";


/**
 * @description Creates a summary of the fundraising as part of the challenge
 * @class FundraiseSummary
 * @implements none
 * @extends React.Component
 * @type {FundraiseSummary}
 * @example <FundraiseSummary />
 * pre-condition: all the imports
 * post-condition: returns a form with all the information about fundraising
 * @param name, address, city, state, website, hours, description, video
 * @returns {FundraiseSummary}
 */

class FundraiseSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            userEmail: this.props.userEmail,
            dollars: '',
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
        AxiosConfig.get(`charityproject/fundraiser/`, {
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
                    dollars: res.data.amount,
                    description: res.data.details,
                    video: res.data.exp_video
                });
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="challenge-form">
                <div className="challenge-form-inner">
                    <label>I reached my project goal of fundraising for a charitable organization that supports the
                        mission of the project:</label>
                    <label className="statement">I fundraised for:</label>
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


export default FundraiseSummary;
