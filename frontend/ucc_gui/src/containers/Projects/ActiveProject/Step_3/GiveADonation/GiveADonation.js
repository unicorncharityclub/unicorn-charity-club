import React from "react";
import GiveDonationDetails
    from "../../../../../components/Project/ActiveProject/Step_3/GiveADonation/GiveDonationDetails"
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import AxiosConfig from "../../../../../axiosConfig";

/**
 * @summary: Stores and retrieves the information from the challenge 3 - give a donation page
 * @description: Contains the methods to store the information with a put and get call for the data entry
 * @class: GiveADonation
 * @extends: React.component
 * @see: {GiveDonationDetails}
 * @params: description, video, finalVideo, name, address, city, stateName, website
 * @fires: get charityproject/give_donation/ and put charityproject/give_donation/
 * @returns: {GiveADonation}
 */

class GiveADonation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            userEmail: cookie.load('user_email'),
            description: '',
            video: '',
            finalVideo: '',
            name: '',
            address: '',
            city: '',
            stateName: '',
            website: ''
        }
    }

    onSubmit(event, action_type) {
        let formData = new FormData();
        console.log(this.state.name)
        console.log(this.state.finalVideo)
        try {
            formData.append('project_id', this.state.projectId);
            formData.append('organisation_name', this.state.name);
            formData.append('organisation_address', this.state.address);
            formData.append('organisation_city', this.state.city);
            formData.append('website', this.state.website);
            formData.append('organisation_state', this.state.stateName);
            formData.append('details', this.state.description);
            formData.append('action_type', action_type);
            formData.append('exp_video', this.state.finalVideo);
        } catch (err) {
            console.log(err)
        }

        AxiosConfig.put('charityproject/give_donation/', formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(
                this.props.history.push(`/Projects/${this.state.projectId}/Congratulations`)
            )
            .catch(error => console.log(error))
    }

    defaultIfEmpty(value) {
        return value === "" ? "" : value;
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    videoHandler = (event) => {
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            finalVideo: event.target.files[0]
        });
    };

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
                    finalVideo: res.data.exp_video
                });
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <GiveDonationDetails id={this.props.match.params.id}
                                     name={this.state.name}
                                     address={this.state.address}
                                     city={this.state.city}
                                     stateName={this.state.stateName}
                                     website={this.state.website}
                                     changeHandler={this.changeHandler.bind(this)}
                                     description={this.state.description}
                                     defaultIfEmpty={this.defaultIfEmpty.bind(this)}
                                     onSubmit={this.onSubmit.bind(this)}
                                     videoHandler={this.videoHandler.bind(this)}
                                     video={this.state.video}/>
            </div>
        )
    }
}

export default GiveADonation;