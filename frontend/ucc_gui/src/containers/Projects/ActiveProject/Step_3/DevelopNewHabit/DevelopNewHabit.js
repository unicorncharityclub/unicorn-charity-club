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
            project_join_date: '',
            challengeStatus: '',
            projectCategory: ''
        }
    };

    componentDidMount() {
        Promise.all([
            AxiosConfig.get('charityproject/active_project_list/'),
            AxiosConfig.get('charityproject/develop_new_habit/',{params: {project_id: this.state.projectId}})])
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
                        newHabit: res2.data.new_habit,
                        description: res2.data.description,
                        video: res2.data.video
                    });
                }
                console.log(res1.data);
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


    saveHandler(event, action_type) {
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
            formData.append('action_type', action_type);
        } catch (err) {
            console.log(err)
        }

        return AxiosConfig.put('charityproject/develop_new_habit/', formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(error => console.log(error))

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