import React from 'react';
import "./ProjectInfo.css";
import Project_logo from "../../../site_media/default-images/project_default.jpg";


class ProjectInfo extends React.Component {

    render() {
        let status;
        if (this.props.challenge_status === 'Challenge1Complete')
            status = 'Challenge 1 completed';
        else if (this.props.challenge_status === 'Challenge2Complete')
            status = 'Challenge 2 completed';
        else if (this.props.challenge_status === 'Challenge3Complete')
            status = 'Challenge 3 completed';
        return (
            <div>
                <div className="project-header">
                    <p className="logo-cell">
                        <img className="project-logo" src={this.props.project_badge || Project_logo} alt="Avatar"/>
                    </p>
                    <p>
                        <label>{this.props.project_name}</label>
                        <label>Date Joined: {this.props.project_join_date}</label>
                        <label>Status: {status}</label>
                    </p>
                </div>
            </div>
        );
    }
}


export default ProjectInfo;
