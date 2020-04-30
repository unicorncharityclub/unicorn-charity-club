import React from "react";
import LearnNewSkillComponent
    from "../../../../../components/Project/ActiveProject/Step_3/LearnNewSkill/LearnNewSkillComponent";
import AxiosConfig from "../../../../../axiosConfig";
import * as cookie from "react-cookies";

/**
 * @description Saves and fetches all the information of the Challenge 3 Learn new skill
 * @class LearnNewSkill
 * @implements LearnNewSkillComponent
 * @extends React.Component
 * @type {LearnNewSkill}
 * @example <LearnNewSkill />
 * pre-condition: all the imports
 * post-condition: saves all the information of the Learn new skill page
 * @param null
 * @returns {LearnNewSkill}
 */

class LearnNewSkill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newSkill: '',
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
            AxiosConfig.get('charityproject/learn_new_skill/', {params: {project_id: this.state.projectId}})])
            .then(([res1, res2]) => {
                for (let i = 0; i < res1.data.length; i++) {
                    if (res1.data[i].project.id === parseInt(this.state.projectId)) {
                        this.setState({
                            projectBanner: res1.data[i].project.banner,
                        });
                    }
                }
                if (res2.data) {
                    this.setState({
                        newSkill: res2.data.new_skill,
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

    checkEmptySkill() {
        if (!this.state.newSkill) {
            this.setState({errorMessage: "Please enter a skill."});
            return true;
        }
        return false;
    }

    checkEmptyDescription() {
        if (!this.state.description) {
            this.setState({errorMessage: "Please enter a description of the skill."});
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
            formData.append('new_skill', this.state.newSkill);
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

        if (action_type === 'done' && this.checkEmptySkill() === false && this.checkEmptyDescription() === false
            && this.checkEmptyVideo() === false) {
            return AxiosConfig.put('charityproject/learn_new_skill/', formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then(
                    this.props.history.push(`/Projects/${this.state.projectId}/Congratulations`)
                )
                .catch(error => console.log(error));
        } else if (action_type === 'save') {
            return AxiosConfig.put('charityproject/learn_new_skill/', formData,
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
                <LearnNewSkillComponent
                    newSkill={this.state.newSkill}
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

export default LearnNewSkill;
