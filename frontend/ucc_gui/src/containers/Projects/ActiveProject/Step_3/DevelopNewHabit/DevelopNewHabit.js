import React from "react";
import DevelopNewHabitComponent
    from "../../../../../components/Project/ActiveProject/Step_3/DevelopNewHabit/DevelopNewHabitComponent";
import {Container} from "@material-ui/core";
import * as cookie from "react-cookies";
import AxiosConfig from "../../../../../axiosConfig";

/**
 * @description Saves and fetches all the information of the Challenge 3 Develop new habit
 * @class DevelopNewHabit
 * @implements DevelopNewHabitComponent
 * @extends React.Component
 * @type {DevelopNewHabit}
 * @example <DevelopNewHabit />
 * pre-condition: all the imports
 * post-condition: saves all the information of the Develop new habit page
 * @param null
 * @returns {DevelopNewHabit}
 */

class DevelopNewHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newHabit: '',
            description: '',
            video: '',
            finalVideo: '',
            projectId: this.props.match.params.id,
            projectName: '',
            projectBanner: '',
            projectBadge: '',
            projectMission: '',
            //project_join_date: '',
            challengeStatus: '',
            projectCategory: ''
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
                            projectCategory: res.data.active_project_list[i].project_category,
                            projectJoinDate: res.data.active_project_list[i].project_join_date,
                            challengeStatus: res.data.active_project_list[i].challenge_status
                        });
                    }
                }
                console.log(res.data);
            }).catch(error => console.log(error))
    };

    defaultIfEmpty(value) {
        return value === "" ? "" : value;
    }

    changeHandler(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    };

    videoHandler(event) {
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            finalVideo: event.target.files[0]
        });
    };


    saveHandler(event, requestType) {
        //event.preventDefault();
        let formData = new FormData();
        try {
            formData.append('new_habit', this.state.newHabit);
            formData.append('description', this.state.description);
            if (this.state.finalVideo) {
                formData.append('video', this.state.finalVideo, this.state.finalVideo.name);
            }
            formData.append('project_id', this.state.projectId);
            formData.append('email', cookie.load('user_email'));
        } catch (err) {
            console.log(err)
        }

        switch (requestType) {
            case 'post':
                return AxiosConfig.post('charityproject/DevelopNewHabit', formData,
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
                <DevelopNewHabitComponent newHabit={this.state.newHabit}
                                          description={this.state.description}
                                          video={this.state.video}
                                          projectBanner={this.state.projectBanner}
                                          projectBadge={this.state.projectBadge}
                                          projectName={this.state.projectName}
                                          projectJoinDate={this.state.projectJoinDate}
                                          challengeStatus={this.state.challengeStatus}
                                          projectMission={this.state.projectMission}
                                          projectCategory={this.state.projectCategory}
                                          defaultIfEmpty={this.defaultIfEmpty.bind(this)}
                                          changeHandler={this.changeHandler.bind(this)}
                                          videoHandler={this.videoHandler.bind(this)}
                                          saveHandler={this.saveHandler.bind(this)}/>
            </div>
        )
    }
}

export default DevelopNewHabit;