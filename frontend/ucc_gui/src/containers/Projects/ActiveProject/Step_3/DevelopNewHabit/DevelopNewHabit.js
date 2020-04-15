import React from "react";
import DevelopNewHabitComponent
    from "../../../../../components/Project/ActiveProject/Step_3/DevelopNewHabit/DevelopNewHabitComponent";
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
        AxiosConfig.get('charityproject/active_project_list/')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].project.id === parseInt(this.state.projectId)) {
                        console.log("inside");
                        this.setState({
                            projectName: res.data[i].project.name,
                            projectBanner: res.data[i].project.banner,
                            projectBadge: res.data[i].project.badge,
                            projectMission: res.data[i].project.mission,
                            projectCategory: res.data[i].project.category,
                            projectJoinDate: res.data[i].date_joined,
                            challengeStatus: res.data[i].challenge_status
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