import React from 'react';
import "./Challenge2Details.css"
import "react-datepicker/dist/react-datepicker.css";
import TextTheme from "../../../General/Text/TextTheme";
import "../../../../containers/ProjectCommon.css"
import AxiosConfig from "../../../../axiosConfig";
import ProgressStepper from "../../ProgressStepper";
import ProjectBanner from "../../ProjectBanner";
import ProjectInfo from "../../Details/ProjectInfo";
import DatePicker from "react-datepicker";
import TwoButtonLayout from "../../../General/TwoButtonLayout";

/**
 * @summary: Creates the UI of the challenge 2 page
 * @description: Creates the fields and styling for the challenge 2 selection of task page
 * @class: ProjectContent
 * @extends: React.component
 * @see: {Challenge2Details.css}
 * @param: projectId, projectName, projectBanner, projectBadge, projectJoinDate, projectChallengeStatus, selectedOption
 * @returns: {ProjectContent}
 */

class ProjectContent extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        projectId: this.props.id,
        projectName : '',
        projectBanner : '',
        projectBadge : '',
        projectJoinDate :'',
        projectChallengeStatus: '',
        selectedOption: '',
    }
 }


    componentDidMount () {
        AxiosConfig.get(`charityproject/${this.state.projectId}/`)
      .then(res => {
              this.setState({
                  projectBanner : res.data.banner,
              });
      }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="header_main">
                <div className="header_step_banner_main">
                    <div className="banner_main">
                        <div className="banner_main_content">
                            <ProjectBanner image={this.state.projectBanner}  />
                        </div>
                    </div>

                    <div className="stepper_main">
                        <div className="stepper_main_content">
                            <ProgressStepper currentStep="1" />
                        </div>
                    </div>
                </div>

                <div className="page_info_hr_content_main" >
                    <ProjectInfo id={this.state.projectId} />
                </div>
            
            <div className="page_main">
                <div className="page_info_vr_content_main">
                    <ProjectInfo vertical={true} id={this.state.projectId} />
                </div>
                
                <form onSubmit={this.handleFormSubmit}>
                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <TextTheme message="Challenge 2: Ideation" className="text_large text_blue" />
                            <br/>
                            <TextTheme message="SET YOUR GOAL" className="text_medium text_black" />
                            <br/>
                            <TextTheme message="1. How can I make a difference? Explore the following impact adventures and set your project goal." className="text_medium text_black" />
                            <ul style={{paddingLeft:"60px"}}>
                                <br/>
                                
                                <div className="OptionList">
                                        <input name="Option" type ="radio" value="1" checked={this.state.checked} onClick={this.props.handleChecked}/>
                                        <label htmlFor="Option"> <TextTheme message = "Spread the word by inviting 5+ friends to the project" className="text_small text_black"/></label><br/>
                                    <br/>

                                        <input name="Option" type="radio" value="2" checked={this.state.checked} onClick={this.props.handleChecked}/>
                                        <label htmlFor="Option"> <TextTheme message = "Learn a new skill that supports the mission" className="text_small text_black"/></label><br/>
                                    <br/>

                                        <input name="Option" type="radio" value="3" checked={this.state.checked} onClick={this.props.handleChecked}/>
                                        <label htmlFor="Option"> <TextTheme message = "Develop a new habit that supports the mission" className="text_small text_black"/></label><br/>
                                    <br/>

                                        <input name="Option" type="radio" value="4" checked={this.state.checked} onClick={this.props.handleChecked}/>
                                        <label htmlFor="Option"> <TextTheme message = "Volunteer time at a local organization" className="text_small text_black"/></label><br/>
                                    <br/>

                                        <input name="Option" type="radio" value="5" checked={this.state.checked} onClick={this.props.handleChecked}/>
                                        <label htmlFor="Option"> <TextTheme message = "Give a donation to support the mission" className="text_small text_black"/></label><br/>
                                    <br/>

                                        <input name="Option" type="radio" value="6" checked={this.state.checked} onClick={this.props.handleChecked}/>
                                        <label htmlFor="Option"> <TextTheme message = "Fundraise money to support the mission" className="text_small text_black"/></label><br/>
                                    <br/>
                                </div>
                            </ul>
                            <br/>
                            <TextTheme message="2. Set a target date to complete your goal:" className="text_medium text_black" />
                                <br/>
                            <div className="DatePick">
                                <DatePicker selected = {this.props.goalDate} onChange={this.props.handleDateChange}/>
                            </div>
                                <br/>
                                <br/>   
                            <TwoButtonLayout button1Text="SAVE" button2Text="NEXT" button2Click={this.props.onSubmit}/>
                            
                        </div>
                    </div>  
                </form>
            </div>
        </div>
        );
    }
}


export default ProjectContent;
