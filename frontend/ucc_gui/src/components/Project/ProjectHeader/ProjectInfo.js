import React from 'react';
import "./ProjectInfo.css";
import Project_logo from "../../../site_media/default-images/project_default.jpg";


class ProjectInfo extends React.Component {

    render() {
        let status;
        if (this.props.challengeStatus === 'Challenge1Complete')
            status = 'Challenge 1 completed';
        else if (this.props.challengeStatus === 'Challenge2Complete')
            status = 'Challenge 2 completed';
        else if (this.props.challengeStatus === 'Challenge3Complete')
            status = 'Challenge 3 completed';
        return (
            <div>
                <div className="project-header">
                    <p>
                        <img className="project-logo" src={this.props.projectBadge || Project_logo} alt="Avatar"/>
                    </p>
                    <p>
                        <label className="project-name">{this.props.projectName}</label>
                        <label>Category: {this.props.projectCategory}</label>
                        <label>Date Joined: {this.props.projectJoinDate}</label>
                        <label>Status: {status}</label>
                        {(this.props.projectMission) ?
                            <div>
                                <label className="project-name">Mission</label>
                                <label>{this.props.projectMission}</label>
                            </div>
                            : ''
                        }
                    </p>
                </div>
            </div>
        );
    }
}


export default ProjectInfo;
