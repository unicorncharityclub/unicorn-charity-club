import React from 'react';
import "./Challenge2Details.css"
import "react-datepicker/dist/react-datepicker.css";
import TextBlueHeading from "../../../General/Text/TextBlueHeading";
import TextBlack from "../../../General/Text/TextBlack";
import Image from "react-bootstrap/Image";
import axiosConfig from "../../../../axiosConfig";
import TextBlackHeading from "../../../General/Text/TextBlackHeading";
import ProgressStepper from "../../ProgressStepper";
import ProjectBanner from "../../ProjectBanner";
import Checkbox from "../../../General/Form/Checkbox"
import ProjectInfo from "../../../Project/ProjectHeader/ProjectInfo.js"
import Project_Data from "./Project_Data";
class ProjectContent extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        Project_id: this.props.id,
        ProjectName : '',
        ProjectBanner : '',
        ProjectBadge : '',
        ProjectJoinDate :'',
        ProjectChallengeStatus: '',
        selectedOption: '',
    }
 }


    componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.Project_id}`)
      .then(res => {
              this.setState({
                  ProjectName : res.data.project_name,
                  ProjectBanner : res.data.project_banner,
                  ProjectBadge: res.data.project_badge,
                  ProjectJoinDate: res.data.project_join_date,
                  ProjectChallengeStatus: res.data.challenge_status
              });
      }).catch(error => console.log(error))
    }

    render() {
        return (
                <form onSubmit={this.handleFormSubmit}>
                <div>
                    <Project_Data ProjectName = {this.state.ProjectName}
                    ProjectBadge = {this.state.ProjectBadge}
                    ProjectBanner = {this.state.ProjectBanner}
                    ProjectJoinDate = {this.state.ProjectJoinDate}
                    ProjectChallengeStatus = {this.state.ProjectChallengeStatus}/>
                <TextBlueHeading message="Challenge 2: Ideation"/>
                      <br/>
                        <TextBlack message = "SET YOUR GOAL"/>
                        <br/>
                        <TextBlack message = "1. How can I make a difference? Explore the following impact adventures and set your project goal."/>
                        <ul style={{paddingLeft:"60px"}}>
                            <br/>
                            <div className="OptionList">
                            <input name="Options" type = "radio" value="1" checked={this.state.checked} onClick={this.props.handleChecked}/>
                            <label for="Option1"> <TextBlack message = "Spread the word by inviting 5+ friends to the project"/></label><br/>
                            <br/>

                            <input name="Options" type="radio" value="2" checked={this.state.checked} onClick={this.props.handleChecked}/>
                            <label for="Option2"> <TextBlack message = "Learn a new skill that supports the mission"/></label><br/>
                            <br/>

                            <input name="Options" type="radio" value="3" checked={this.state.checked} onClick={this.props.handleChecked}/>
                            <label for="Option3"> <TextBlack message = "Develop a new habit that supports the mission"/></label><br/>
                            <br/>

                            <input name="Options" type="radio" value="4" checked={this.state.checked} onClick={this.props.handleChecked}/>
                            <label for="Option4"> <TextBlack message = "Volunteer time at a local organization"/></label><br/>
                            <br/>

                            <input name="Options" type="radio" value="5" checked={this.state.checked} onClick={this.props.handleChecked}/>
                            <label for="Option5"> <TextBlack message = "Give a donation to support the mission"/></label><br/>
                            <br/>

                            <input name="Options" type="radio" value="6" checked={this.state.checked} onClick={this.props.handleChecked}/>
                            <label for="Option6"> <TextBlack message = "Fundraise money to support the mission"/></label><br/>
                            <br/>
                            </div>
                        </ul>
                        </div>
                     </form>
        );
    }
}


export default ProjectContent;
