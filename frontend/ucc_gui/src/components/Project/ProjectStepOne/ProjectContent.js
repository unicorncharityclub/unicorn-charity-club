import React from 'react';
import {Player} from "video-react";
import TextBlueHeading from "../../General/TextBlueHeading";
import TextBlack from "../../General/TextBlack";
import TextBlue from "../../General/TextBlue";
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import Button from '@material-ui/core/Button';
class ProjectContent extends React.Component {

    render() {
        return (
            <div style={{borderRadius: "10px", borderStyle:"solid", margin:"10px"}}>
                  <div style={{margin:"10px"}}>
                      <TextBlueHeading message="Share Your Story"/>
                        <TextBlack message = "Create a personal video that tells your friends and family about your new project. Be sure to:"/>
                        <ul style={{paddingLeft:"60px"}}>
                            <li><TextBlack message = "Explain why you chose this project."/></li>
                            <li><TextBlack message = "Explain why people should support the project mission."/></li>
                            <li><TextBlack message = "Ask your friends and family to join your project."/></li>
                        </ul>
                        <br/>
                      <div style={{textAlign: "center"}}>
                      <input type="file" name="file" id="contained-button-file" accept="video/*" style={{display: 'none'}} onChange={this.props.videoHandler.bind(this)}/>
                      <label htmlFor="contained-button-file" style={{align:"center"}}>
                        <Button
                            variant="contained"
                            startIcon={<CameraAltRoundedIcon />}
                            component="span"
                          >
                            <TextBlueHeading message="Upload / Create a Video"/>

                          </Button>
                      </label>

                          {
                            this.props.userProjectVideo ?
                                <div style={{margin:"50px", borderStyle:"solid", height:"150px", width:"400px"}}>
                                    <Player playsInline src={URL.createObjectURL(this.props.userProjectVideo)} />
                                </div>
                                :''
                        }
                        </div>
                  </div>
                <br/>
                <br/>
            </div>
        );
    }
}


export default ProjectContent;
