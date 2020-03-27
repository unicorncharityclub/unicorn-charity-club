import React from "react";
import LearnNewSkillComponent
    from "../../../../../components/Project/ActiveProject/Step_3/LearnNewSkill/LearnNewSkillComponent";
import {Container} from "@material-ui/core";
import axiosConfig from "../../../../../axiosConfig";
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
            new_skill: '',
            description: '',
            video: '',
            final_video: '',
            project_Id: this.props.match.params.id,
            project_name: '',
            project_banner: '',
            project_badge: '',
            //project_join_date: '',
            challenge_status: ''
        }
    };

    componentDidMount() {
        axiosConfig.get(`charityproject/activeProjectList/${cookie.load('user_emailid')}`)
            .then(res => {
                for (let i = 0; i < res.data.active_project_list.length; i++) {
                    if (res.data.active_project_list[i].project_id === parseInt(this.state.project_Id)) {
                        console.log("inside");
                        this.setState({
                            project_name: res.data.active_project_list[i].project_name,
                            project_banner: res.data.active_project_list[i].project_banner,
                            project_badge: res.data.active_project_list[i].project_badge,
                            project_join_date: res.data.active_project_list[i].project_join_date,
                            challenge_status: res.data.active_project_list[i].challenge_status
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
            final_video: event.target.files[0]
        });
    };


    saveHandler(event, requestType) {
        //event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append('newSkill', this.state.new_skill);
            form_data.append('description', this.state.description);
            if (this.state.final_video) {
                form_data.append('video', this.state.final_video, this.state.final_video.name);
            }
            form_data.append('projectId', this.state.project_Id);
            //form_data.append('email', 'bhawanaprasadmail@gmail.com');
            form_data.append('email', cookie.load('user_emailid'));
        } catch (err) {
            console.log(err)
        }

        switch (requestType) {
            case 'post':
                return axiosConfig.post('charityproject/LearnNewSkill', form_data,
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
                <Container>
                    <LearnNewSkillComponent
                        new_skill={this.state.new_skill}
                        description={this.state.description}
                        video={this.state.video}
                        project_banner={this.state.project_banner}
                        project_badge={this.state.project_badge}
                        project_name={this.state.project_name}
                        project_join_date={this.state.project_join_date}
                        challenge_status={this.state.challenge_status}
                        defaultIfEmpty={this.defaultIfEmpty.bind(this)}
                        changeHandler={this.changeHandler.bind(this)}
                        videoHandler={this.videoHandler.bind(this)}
                        saveHandler={this.saveHandler.bind(this)}/>
                </Container>
            </div>
        )
    }
}

export default LearnNewSkill;