import React from 'react';
import {Player} from "video-react";
import Upload_video from "../../../../../image/Settings_Camera.png";
import "../../../../../containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill.css";
import Button from "react-bootstrap/Button";
import axiosConfig from "../../../../../axiosConfig";
import * as cookie from "react-cookies";
import Project_logo from "../../../../../site_media/default-images/project_default.jpg";


class DevelopNewHabitComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newHabit: '',
            description: '',
            video: '',
            finalVideo: '',
            projectId: this.props.id
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
           video : URL.createObjectURL(event.target.files[0]),
           finalVideo: event.target.files[0]
        });
    };


    saveHandler(event,  requestType){
        event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append('newHabit', this.state.newHabit);
            form_data.append('description', this.state.description);
            if (this.state.finalVideo) {
                form_data.append('video', this.state.finalVideo, this.state.finalVideo.name);
            }
            form_data.append('projectId', this.state.projectId);
            //form_data.append('email', 'bhawanaprasadmail@gmail.com');
            form_data.append('email', cookie.load('user_emailid'));
        } catch(err) {
            console.log(err)
        }

        switch( requestType ) {
            case 'post':
            return axiosConfig.post('charityproject/DevelopNewHabit', form_data,
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
                              <img className="project-logo" src={Project_logo} alt="Avatar"/>
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
                          <label>DEVELOP A NEW HABIT</label>
                          <label>Develop a new habit that will support the mission of the project.</label>
                          <div className="project-form-inner">
                              <label>1. What new habit did you develop?</label>
                              <input type="text"
                                    name="newHabit"
                                    value={this.defaultIfEmpty(this.state.newHabit)}
                                    onChange={this.changeHandler.bind(this)}/>
                              <label>2. Describe how you learned your new habit.</label>
                              <textarea name="description"
                                     value={this.defaultIfEmpty(this.state.description)}
                                     onChange={this.changeHandler.bind(this)} />
                              <label>3. Share a video or photo that celebrates your new habit.</label>
                          </div>
                      </div>
                    <div className="project-video-preview">
                        {
                              this.state.video ?
                                  <div className="video-upload-preview">
                                      <Player playsInline
                                          src={this.state.video}
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
                            onClick={(event) => this.saveHandler(event, 'post')}>SAVE</Button>
                    <Button className="done-button" id="done" variant="contained" type="submit">DONE</Button>
                </div>
            </div>
        );
    }
}


export default DevelopNewHabitComponent;
