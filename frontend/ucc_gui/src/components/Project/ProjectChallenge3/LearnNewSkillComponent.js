import React from 'react';
import {Player} from "video-react";
import TextBlueHeading from "../../General/TextBlueHeading";
import Upload_photo from "../../../image/Default-profile-picture.png";


class LearnNewSkillComponent extends React.Component {

    render() {
        return (
            <div className="blessing-form">
                  <div>
                      <TextBlueHeading message="Challenge 3: Adventure"/>
                      <br/>
                      <label>LEARN A NEW SKILL</label>
                      <br/>
                      <label>Develop a new skill that will support the mission of the project.</label>
                      <br/>
                      <label>1. What new skill did you develop?</label>
                      <br/>
                      <input type="text"
                            name="NewSkill"
                            value=""
                            onChange=""/>
                      <br/>
                      <label>2. Describe how you learned your new skill.</label>
                      <br/>
                      <input type="text"
                             name="Description"
                             value=""
                             onChange="" />
                      <br/>
                      <label>3. Share a video or photo that celebrates your new skill.</label>
                      <br/>
                      <img className="profile-picture-list" src={Upload_photo} alt=""/>
                      <label className="upload-photo" htmlFor="file">Upload/Create Video</label>
                      <input id="file" style={{display: 'none'}}
                                     type="file"
                                     name="Photo"
                                     accept=".png, .jpeg, .jpg"
                                     onChange=""/>

                  </div>
            </div>
        );
    }
}


export default LearnNewSkillComponent;
