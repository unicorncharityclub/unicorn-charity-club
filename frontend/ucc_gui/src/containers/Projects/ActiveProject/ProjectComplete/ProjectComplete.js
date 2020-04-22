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
            description: '',
            userEmail: cookie.load('user_email')
        }
    };

    componentDidMount() {
        Promise.all([
            AxiosConfig.get('charityproject/active_project_list/'),
            AxiosConfig.get(`charityproject/Congratulations/${this.state.projectId}/${cookie.load('user_email')}`)])
            .then(([res1, res2]) => {
                for (let i = 0; i < res1.data.length; i++) {
                    if (res1.data[i].project.id === parseInt(this.state.projectId)) {
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
                    if (res2.data.adventure_id === 1) {
                        this.setState({
                            invitees: res2.data.invitees,
                            video: res2.data.video
                        });
                    }
                }
                console.log(res1.data);
            }).catch(error => console.log(error))
    };

    saveHandler(event) {
        //event.preventDefault();
        let formData = new FormData();
        try {
            formData.append('project_id', this.state.projectId);
        } catch (err) {
            console.log(err)
        }

        return AxiosConfig.put('charityproject/start/', formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res);
                this.props.history.push('/Projects/');
            })
            .catch(error => console.log(error))

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
                                          projectId={this.state.projectId}
                                          userEmail={this.state.userEmail}
                                          image={this.state.image}
                                          invitees={this.state.invitees}
                                          video={this.state.video}
                                          saveHandler={this.saveHandler.bind(this)}/>

            </div>
        )
    }
}

export default ProjectComplete;