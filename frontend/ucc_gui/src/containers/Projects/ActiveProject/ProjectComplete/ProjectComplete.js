import React from "react";
import * as cookie from "react-cookies";
import AxiosConfig from "../../../../axiosConfig";
import ProjectCompleteComponent
    from "../../../../components/Project/ActiveProject/ProjectComplete/ProjectCompleteComponent";

/**
 * @description Displays the prize earned by a user after completion of a project.
 * @class ProjectComplete
 * @implements ProjectCompleteComponent
 * @extends React.Component
 * @type {ProjectComplete}
 * @example <ProjectComplete />
 * pre-condition: all the imports
 * post-condition: saves the prize earned by the user.
 * @param null
 * @returns {ProjectComplete}
 */

class ProjectComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            projectName: '',
            projectBanner: '',
            projectBadge: '',
            //project_join_date: '',
            challengeStatus: '',
            projectMission: '',
            image: '',
            invitees: [],
            video: '',
            newSkill: '',
            description: '',
            newHabit: '',
            organisationName: '',
            organisationAddress: '',
            organisationCity: '',
            organisationState: '',
            organisationWebsite: '',
            volunteerHours: '',
        }
    };

    componentDidMount() {
        Promise.all([
            AxiosConfig.get('charityproject/active_project_list/'),
            AxiosConfig.get(`charityproject/Congratulations/${this.state.projectId}/${cookie.load('user_email')}`)])
            .then(([res1, res2]) => {
                for (let i = 0; i < res1.data.length; i++) {
                    if (res1.data[i].project_id === parseInt(this.state.projectId)) {
                        this.setState({
                            projectName: res1.data[i].project.name,
                            projectBanner: res1.data[i].project.banner,
                            projectBadge: res1.data[i].project.badge,
                            projectMission: res1.data[i].project.mission,
                            projectCategory: res1.data[i].project.category,
                            projectJoinDate: res1.data[i].date_joined,
                            challengeStatus: res1.data[i].challenge_status
                        });
                    }
                }
                if (res2.data) {
                    this.setState({
                        image: res2.data.image,
                        adventureId: res2.data.adventure_id
                    });
                    if(res2.data.adventure_id === 1) {
                        this.setState({
                            invitees: res2.data.invitees,
                            video: res2.data.video
                        });
                    } else if(res2.data.adventure_id === 2){
                        this.setState({
                            newSkill: res2.data.new_skill,
                            description: res2.data.description,
                            video: res2.data.video
                        });
                    } else if(res2.data.adventure_id === 3){
                        this.setState({
                            newHabit: res2.data.new_habit,
                            description: res2.data.description,
                            video: res2.data.video
                        });
                    } else if(res2.data.adventure_id === 4){
                        this.setState({
                            organisationName: res2.data.organisation_name,
                            organisationAddress: res2.data.organisation_address,
                            organisationCity: res2.data.organisation_city,
                            organisationState: res2.data.organisation_state,
                            organisationWebsite: res2.data.organisation_website,
                            volunteerHours: res2.data.volunteer_hours,
                            description: res2.data.volunteer_work_description,
                            video: res2.data.video
                        });
                    } else if(res2.data.adventure_id === 5){
                        this.setState({
                            organisationName: res2.data.organisation_name,
                            organisationAddress: res2.data.organisation_address,
                            organisationCity: res2.data.organisation_city,
                            organisationState: res2.data.organisation_state,
                            organisationWebsite: res2.data.organisation_website,
                            video: res2.data.video
                        });
                    } else if(res2.data.adventure_id === 6){
                        this.setState({
                            organisationName: res2.data.organisation_name,
                            organisationAddress: res2.data.organisation_address,
                            organisationCity: res2.data.organisation_city,
                            organisationState: res2.data.organisation_state,
                            organisationWebsite: res2.data.organisation_website,
                            description: res2.data.fundraise_details,
                            video: res2.data.video
                        });
                    }
                }
                console.log(res1.data);
            }).catch(error => console.log(error))
    };

    saveHandler(event, requestType) {
        //event.preventDefault();
        let formData = new FormData();
        try {
            formData.append('prize', this.state.image);
            formData.append('project_id', this.state.projectId);
        } catch (err) {
            console.log(err)
        }

        switch (requestType) {
            case 'post':
                return AxiosConfig.post('charityproject/', formData,
                    {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(error => console.log(error))
        }
    };

    render() {
        return (
            <div>
                <ProjectCompleteComponent projectBanner={this.state.projectBanner}
                                          projectBadge={this.state.projectBadge}
                                          projectName={this.state.projectName}
                                          projectJoinDate={this.state.projectJoinDate}
                                          challengeStatus={this.state.challengeStatus}
                                          projectMission={this.state.projectMission}
                                          adventureId={this.state.adventureId}
                                          image={this.state.image}
                                          invitees={this.state.invitees}
                                          video={this.state.video}
                                          newSkill={this.state.newSkill}
                                          description={this.state.description}
                                          newHabit={this.state.newHabit}
                                          organisationName={this.state.organisationName}
                                          organisationAddress={this.state.organisationAddress}
                                          organisationCity={this.state.organisationCity}
                                          organisationState={this.state.organisationState}
                                          organisationWebsite={this.state.organisationWebsite}
                                          volunteerHours={this.state.volunteerHours}
                                          saveHandler={this.saveHandler.bind(this)}/>

            </div>
        )
    }
}

export default ProjectComplete;