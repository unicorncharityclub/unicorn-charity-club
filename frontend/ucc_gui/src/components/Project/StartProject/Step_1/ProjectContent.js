import React from 'react';
import TextBlueHeading from "../../../General/Text/TextBlueHeading";
import TextBlack from "../../../General/Text/TextBlack";
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import AlertMessage from "../../../General/AlertMessage";
import Video from "../../../General/Video/Video";
class ProjectContent extends React.Component {

    render() {
        return (
                  <div style={{margin:"10px"}}>
                      <TextBlueHeading message="Share Your Story"/>
                        <b><TextBlack message = "Create a personal video that tells your friends and family about your new project. Be sure to:"/></b>
                        <ul style={{paddingLeft:"60px"}}>
                            <br/>
                            <li><TextBlack message = "Explain why you chose this project."/></li>
                            <br/>
                            <li><TextBlack message = "Explain why people should support the project mission."/></li>
                            <br/>
                            <li><TextBlack message = "Ask your friends and family to join your project."/></li>
                        </ul>
                        <br/>
                      <div>
                      <Video src={this.props.video}
                        id="file" style={{display: 'none'}}
                           type="file"
                           name="video"
                           accept="video/*"
                           onChange={this.props.videoHandler.bind(this)}/>
                      </div>
                <br/>
                <br/>
            </div>
        );
    }
}


export default ProjectContent;
