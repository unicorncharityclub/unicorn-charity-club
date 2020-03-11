import React from 'react';
import {Player} from "video-react";
import Upload_video from "../../../image/Settings_Camera.png";
import "../../../containers/Projects/LearnNewSkill/LearnNewSkill.css";
import Button from "react-bootstrap/Button";
import axiosConfig from "../../../axiosConfig";
import * as cookie from "react-cookies";


class LearnNewSkillComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            NewSkill: '',
            Description: '',
            Video: '',
            finalVideo: '',
            ProjectId: this.props.id,
            Email: cookie.load('user_emailid')
        }
    };

    defaultIfEmpty(value){
        return value === "" ? "":value;
    }

    changeHandler = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    };

    videoHandler = (event) =>{
       this.setState({
           Video : URL.createObjectURL(event.target.files[0]),
           finalVideo: event.target.files[0]
        });
    };


    saveHandler(event,  requestType, id){
        event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append('NewSkill', this.state.NewSkill);
            form_data.append('Description', this.state.Description);
            if (this.state.finalVideo) {
                form_data.append('Video', this.state.finalVideo, this.state.finalVideo.name);
            }
            form_data.append('ProjectId', this.state.ProjectId);
            form_data.append('Email', this.state.UserEmailId);
        } catch(err) {
            console.log(err)
        }

        switch( requestType ) {
            case 'post':
            return axiosConfig.post('http://127.0.0.1:8000/learn_new_skill/', form_data,
                    {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then(res => {console.log(res)})
                    .catch(error => console.log(error))
            // case 'put':
            //     return axiosConfig.put(`http://127.0.0.1:8000/learn_new_skill/${id}/`, form_data,
            //         {
            //             headers: {
            //                 'content-type': 'multipart/form-data'
            //             }
            //         })
            //         .then(res => console.log(res))
            //         .catch(error => console.log(error))
        }
    };


    render() {
        return (
            <div className="form-wrapper">
                      <div className="project-header">
                          <p>
                              <img className="project-logo" src={Upload_video} alt="Avatar"/>
                          </p>
                          <p>
                              <label>Charity Project</label>
                              <label>Date Joined</label>
                              <label>Status</label>
                          </p>
                      </div>
                      <div className="challenge-name">
                          <label>CHALLENGE 3: Adventure</label>
                      </div>
                      <div className="project-form">
                          <label>LEARN A NEW SKILL</label>
                          <label>Develop a new skill that will support the mission of the project.</label>
                          <div className="project-form-inner">
                              <label>1. What new skill did you develop?</label>
                              <input type="text"
                                    name="NewSkill"
                                    value={this.defaultIfEmpty(this.state.NewSkill)}
                                    onChange={this.changeHandler.bind(this)}/>
                              <label>2. Describe how you learned your new skill.</label>
                              <textarea name="Description"
                                     value={this.defaultIfEmpty(this.state.Description)}
                                     onChange={this.changeHandler.bind(this)} />
                              <label>3. Share a video or photo that celebrates your new skill.</label>
                          </div>
                      </div>
                    <div className="project-video-preview">
                        {
                              this.state.Video ?
                                  <div className="video-upload-preview">
                                      <Player playsInline
                                          src={this.state.Video}
                                      />
                                  </div>:''
                        }
                    </div>
                      <div className="project-video">
                          <img className="project-video-upload" src={Upload_video} alt=""/>
                          <input id="file" style={{display: 'none'}}
                                         type="file"
                                         name="Video"
                                         accept="video/*"
                                         onChange={this.videoHandler.bind(this)}/>
                          <label className="upload-video" htmlFor="file">Upload/Create Video</label>
                      </div>
                <div className="navigate-save">
                    {/*<label htmlFor="save">Save</label>*/}
                    <Button className="save-button" id="save" variant="contained" type="submit"
                            onClick={this.saveHandler.bind(this)}>SAVE</Button>
                    <Button className="done-button" id="done" variant="contained" type="submit">DONE</Button>
                </div>
            </div>
        );
    }
}


export default LearnNewSkillComponent;
