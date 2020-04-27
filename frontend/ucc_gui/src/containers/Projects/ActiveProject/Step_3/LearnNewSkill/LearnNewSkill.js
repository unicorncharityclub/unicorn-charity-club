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
        Promise.all([
            AxiosConfig.get('charityproject/active_project_list/'),
            AxiosConfig.get('charityproject/learn_new_skill/',{params: {project_id: this.state.projectId}})])
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
        return AxiosConfig.put('charityproject/learn_new_skill/', formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
                this.props.history.push(`/Projects/${this.state.projectId}/Congratulations`)
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div>
                <LearnNewSkillComponent
                    newSkill={this.state.newSkill}
                    description={this.state.description}
                    video={this.state.video}
                    projectBanner={this.state.projectBanner}
                    projectBadge={this.state.projectBadge}
                    projectName={this.state.projectName}
                    projectMission={this.state.projectMission}
                    projectCategory={this.state.projectCategory}
                    projectJoinDate={this.state.projectJoinDate}
                    challengeStatus={this.state.challengeStatus}
                    projectId={this.state.projectId}
                    defaultIfEmpty={this.defaultIfEmpty.bind(this)}
                    changeHandler={this.changeHandler.bind(this)}
                    videoHandler={this.videoHandler.bind(this)}
                    saveHandler={this.saveHandler.bind(this)}/>
            </div>
        )
    }
}

export default LearnNewSkill;
