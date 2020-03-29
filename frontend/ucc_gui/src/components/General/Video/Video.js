import React from 'react';
import {Player} from "video-react";
import "../../../../node_modules/video-react/dist/video-react.css";
import UploadVideo from "../../../image/Settings_Camera.png";
import "./Video.css";


class Video extends React.Component {

    render() {
        return (
            <div>
                <div className="project-video-preview" style={{width:this.props.width}}>
                    {
                        (this.props.src) ?
                            <div style={{width:this.props.width}}>
                                <Player className="video-upload-preview" fluid={false} width={600} height={400}
                                    playsInline src={this.props.src}
                                />
                            </div> : ''
                    }
                </div>
                <div className="project-video" style={{width:this.props.width}}>
                    <img className="project-video-upload" src={UploadVideo} alt=""/>
                    <input id={this.props.id} style={{display: 'none'}}
                           type={this.props.type}
                           name={this.props.name}
                           accept={this.props.accept}
                           onChange={this.props.onChange}/>
                    <label className="upload-video" htmlFor="file">Upload/Create Video</label>
                </div>
            </div>
        );
    }
}


export default Video;
