import React from 'react';
import TextTheme from "../../../General/Text/TextTheme";
import Video from "../../../General/Video/Video";
class ProjectContent extends React.Component {

    render() {
        return (
                  <div style={{margin:"10px"}}>
                      <TextTheme message="Share Your Story" className="text_large text_blue" />
                        <b><TextTheme message = "Create a personal video that tells your friends and family about your new project. Be sure to:" className="text_small text_black" /></b>
                        <ul style={{paddingLeft:"60px"}}>
                            <br/>
                            <li><TextTheme message = "Explain why you chose this project." className="text_small text_black" /></li>
                            <br/>
                            <li><TextTheme message = "Explain why people should support the project mission." className="text_small text_black" /></li>
                            <br/>
                            <li><TextTheme message = "Ask your friends and family to join your project." className="text_small text_black" /></li>
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
