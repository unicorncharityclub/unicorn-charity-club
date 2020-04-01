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
            image: ''
        }
    };

    componentDidMount() {
        AxiosConfig.get(`charityproject/activeProjectList/${cookie.load('user_email')}`)
            .then(res => {
                for (let i = 0; i < res.data.active_project_list.length; i++) {
                    if (res.data.active_project_list[i].project_id === parseInt(this.state.projectId)) {
                        console.log("inside");
                        this.setState({
                            projectName: res.data.active_project_list[i].project_name,
                            projectBanner: res.data.active_project_list[i].project_banner,
                            projectBadge: res.data.active_project_list[i].project_badge,
                            projectMission: res.data.active_project_list[i].project_mission,
                            projectJoinDate: res.data.active_project_list[i].project_join_date,
                            challengeStatus: res.data.active_project_list[i].challenge_status
                        });
                    }
                }
                console.log(res.data);
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
                                          image={this.state.image}
                                          saveHandler={this.saveHandler.bind(this)}/>

            </div>
        )
    }
}

export default ProjectComplete;