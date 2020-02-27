import React from 'react';
import Button from "react-bootstrap/Button";
import {Player} from "video-react";

class ProjectContent extends React.Component {

    render() {
        return (
            <div>
                  <div>
                    <h2 className="textHeader">Share Your Story</h2>
                      <p> Create a personal video that tells your friends and family about your new project. Be sure to:</p>
                        <div>
                    <ul>
                        <li>Explain why you chose this project.</li>
                        <li>Explain why people should support the project mission.</li>
                        <li>Ask your friends and family to join your project. </li>
                    </ul>
                            </div>
                  </div>
                  <div>
                        <input type="file" name="file" accept="video/*" onChange={this.props.videoHandler.bind(this)}/>
                  </div>
                {
                    this.props.userProjectVideo ?
                        <div>
                            <Player
                              playsInline
                              src={URL.createObjectURL(this.props.userProjectVideo)}
                            />
                        </div>
                        :
                        ''
                }

                <br/>
                <br/>
            </div>
        );
    }
}


export default ProjectContent;
