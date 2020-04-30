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
            projectBanner: '',
            errorMessage: ''
        }
    };

    componentDidMount() {
        Promise.all([
            AxiosConfig.get('charityproject/active_project_list/'),
            AxiosConfig.get('charityproject/develop_new_habit/', {params: {project_id: this.state.projectId}})])
            .then(([res1, res2]) => {
                for (let i = 0; i < res1.data.length; i++) {
                    if (res1.data[i].project.id === parseInt(this.state.projectId)) {
                        this.setState({
                            projectBanner: res1.data[i].project.banner
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

    checkEmptyHabit() {
        if (!this.state.newHabit) {
            this.setState({errorMessage: "Please enter a habit."});
            return true;
        }
        return false;
    }

    checkEmptyDescription() {
        if (!this.state.description) {
            this.setState({errorMessage: "Please enter a description of the habit."});
            return true;
        }
        return false;
    }

    checkEmptyVideo() {
        if (!this.state.finalVideo) {
            this.setState({errorMessage: "Please upload a video."});
            return true;
        }
        return false;
    }

    changeHandler(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value.trim()
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

        if (action_type === 'done' && this.checkEmptyHabit() === false && this.checkEmptyDescription() === false
            && this.checkEmptyVideo() === false) {
            return AxiosConfig.put('charityproject/develop_new_habit/', formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then(
                    this.props.history.push(`/Projects/${this.state.projectId}/Congratulations`)
                )
                .catch(error => console.log(error))
        } else if (action_type === 'save') {
            return AxiosConfig.put('charityproject/develop_new_habit/', formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then(
                    this.props.history.push('/Projects/')
                )
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
                                          projectId={this.state.projectId}
                                          defaultIfEmpty={this.defaultIfEmpty.bind(this)}
                                          changeHandler={this.changeHandler.bind(this)}
                                          videoHandler={this.videoHandler.bind(this)}
                                          saveHandler={this.saveHandler.bind(this)}
                                          errorMessage={this.state.errorMessage}/>
            </div>
        )
    }
}

export default DevelopNewHabit;