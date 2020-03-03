import React from "react";
import axiosConfig from '../axiosConfig'

import { NavLink } from "react-router-dom";
import "../containers/Account/Account.css";
import "../containers/MyChildren/MyChildren.css";
import Arrow_backward from "./../image/arrow-backward.png";
import Upload_photo from "./../image/Default-profile-picture.png";
import CheckBox from "./Form/Checkbox";
import * as cookie from "react-cookies";


/**
 * @description Fetches all the details of children associated with a parent account
 * @class ChildForm
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {ChildForm}
 * @example <ChildForm />
 * pre-condition: all the imports
 * post-condition: returns a form for all details of individual child
 * @param null
 * @returns {ChildForm}
 */

class ChildForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Name,
            DOB: this.props.DOB,
            School: this.props.School,
            SchoolGrade: this.props.SchoolGrade,
            Gender: this.props.Gender,
            Aboutme: this.props.Aboutme,
            FavoriteThing: this.props.FavoriteThing,
            Dream: this.props.Dream,
            SuperPowers: this.props.SuperPowers,
            Support:this.props.Support,
            Photo: this.props.Photo,
            id: this.props.id,
            finalImage: '',
            checkedItems: new Map()
        }
    };

    componentWillReceiveProps(nextProps, nextContext){
         this.setState(nextProps);
    }

    changeHandler = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    };

    handleChange = e => {
            const item = e.target.name;
            const isChecked = e.target.checked;
            this.setState(prevState => ({
                checkedItems: prevState.checkedItems.set(item, isChecked)
            }));
    };


    defaultIfEmpty(value){
        return value === "" ? "":value;
    }

    imageHandler(event){
        this.setState({
            Photo: URL.createObjectURL(event.target.files[0]),
            finalImage: event.target.files[0]
        })
        console.log(event.target.files[0])
    }

    saveHandler(event,  requestType, id){
        event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append('Name', this.state.Name);
            form_data.append('DOB', this.state.DOB);
            form_data.append('Gender', this.state.Gender);
            form_data.append('School', this.state.School);
            form_data.append('SchoolGrade', this.state.SchoolGrade);
            form_data.append('Aboutme', this.state.Aboutme);
            form_data.append('FavoriteThing', this.state.FavoriteThing);
            form_data.append('Dream', this.state.Dream);
            form_data.append('SuperPowers', this.state.SuperPowers);
            form_data.append('Support', this.state.Support);
            form_data.append('Photo', this.state.finalImage, this.state.finalImage.name);
            form_data.append('id', this.state.id)
        } catch(err) {
            console.log(err)
        }

        switch( requestType ) {
            case 'post':
            return axiosConfig.post(`http://127.0.0.1:8000/childaccount/addchild/${cookie.load('user_emailid')}/`, form_data,
                    {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then(res => {console.log(res)})
                    .catch(error => console.log(error))
            case 'put':
                return axiosConfig.put(`http://127.0.0.1:8000/childaccount/child/${id}/`, form_data,
                    {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then(res => console.log(res))
                    .catch(error => console.log(error))
        }
    }

  render() {
        const checkboxes = ["Animals",
                    "Art, Culture, Humanities",
                    "Health and Wellness",
                    "Community Development",
                    "Education",
                    "Environment",
                    "Human and Civil Rights",
                    "International Causes",
                    "Research and Public Policy"
            ];

      return (
          <div style={{display: "block"}}>
          <div className="header__wrapper">
              <div className="header__logo">
                  <NavLink to={"/"}>
                      <img src={Arrow_backward} alt="Backward Arrow"/>
                  </NavLink>
                  <div className="header-menu-mobile">
                  </div>
              </div>
              <div className="header-title">
                  My Child
                  <div className="header-link">
                      <label htmlFor="save">Save</label>
                      <input id="save" type="submit" form="child-form" style={{display: 'none'}}/>
                  </div>
              </div>
          </div>
          <form id="child-form" onSubmit={(event) => this.saveHandler(event,
              this.props.requestType,
              this.props.id )}>
              <div className="form-wrapper">
                  <div className="blessing-form">
                      <img className="profile-picture" src={this.state.Photo || Upload_photo} alt=""/>
                      <label className="upload-photo" htmlFor="file">Upload Photo</label>
                          <input id="file" style={{display: 'none'}}
                                     type="file"
                                     name="Photo"
                                     accept=".png, .jpeg, .jpg"
                                     onChange={this.imageHandler.bind(this)}
                          />
                  </div>
                  <div className="child-form">
                      <label>Name:</label>
                      <input type="text" name="Name"
                             placeholder="First Name Last Name"
                             value={this.defaultIfEmpty(this.state.Name)}
                             onChange={event => this.changeHandler(event)}
                      />
                  </div>
                  <div className="child-form">
                      <label>Birth Date: </label>
                      <input
                          type="date"
                          name="DOB"
                          placeholder="12 May 2012"
                          value={this.defaultIfEmpty(this.state.DOB)}
                          onChange={this.changeHandler.bind(this)}
                      />
                  </div>
                  <div className="child-form">
                      <label>Gender: </label>
                      <div className="radio__container">
                      <div className="radio-inline">
                          <input className="radio" id="boy" name="Gender" type="radio" value="Boy"
                                 checked/>
                              <label className="radio__label" htmlFor="boy">Boy</label>
                      </div>
                      <div className="radio-inline">
                          <input className="radio" id="girl" name="Gender" type="radio" value="Girl"/>
                              <label className="radio__label" htmlFor="girl">Girl</label>
                      </div>
                      </div>
                  </div>
                  <div className="child-form">
                      <label>School:</label>
                      <input type="text"
                             name="School"
                             placeholder="School Name"
                             value={this.defaultIfEmpty(this.state.School)}
                             onChange={this.changeHandler.bind(this)}
                      />
                  </div>
                  <div className="child-form" style={{marginBottom: "20px"}}>
                      <label>School Grade: </label>

                      <select className="child-form-select"
                          name="SchoolGrade"
                          placeholder="Select School Grade"
                          value={this.defaultIfEmpty(this.state.SchoolGrade)}
                          onChange={this.changeHandler.bind(this)}
                      >
                          <option value="Select School Grade">Select School Grade</option>
                          <option value="Kindergarten">Kindergarten</option>
                          <option value="Grade 1">Grade 1</option>
                          <option value="Grade 2">Grade 2</option>
                          <option value="Grade 3">Grade 3</option>
                          <option value="Grade 4">Grade 4</option>
                          <option value="Grade 5">Grade 5</option>
                          <option value="Grade 6">Grade 6</option>
                      </select>
                  </div>
                  <div className="child-form">
                  <hr className="form-separator"/>
                  </div>
               <div className="blessing-info">
                      <label>About Me:</label>
                      <textarea type="text"
                             name="Aboutme"
                             placeholder="Tell us what you are..."
                             value={this.defaultIfEmpty(this.state.Aboutme)}
                             onChange={this.changeHandler.bind(this)}
                      />
               </div>
               <div className="blessing-info">
                      <label>My favorite things are...</label>
                      <textarea name="FavoriteThing"
                             placeholder="What do you like to do; eat, listen to, play with, or travel to?"
                             value={this.defaultIfEmpty(this.state.FavoriteThing)}
                             onChange={this.changeHandler.bind(this)}
                      />
               </div>
               <div className="blessing-info">
                      <label>I have a dream that one day...</label>
                      <textarea name="Dream"
                             placeholder="How would you want the world to be different from today?"
                             value={this.defaultIfEmpty(this.state.Dream)}
                             onChange={this.changeHandler.bind(this)}
                      />
               </div>
              <div className="blessing-info">
                      <label>I have the super power(s) to...</label>
                      <textarea name="SuperPowers"
                             placeholder="What powers help you make a greatest impact on the world?"
                             value={this.defaultIfEmpty(this.state.SuperPowers)}
                             onChange={this.changeHandler.bind(this)}
                      />
               </div>
               <div className="blessing-info">
                      {/*<label>I want to make the world a better place by supporting(check all that apply):</label>*/}
                    <CheckBox
                            name="Support"
                            title="I want to make the world a better place by supporting(check all that apply):"
                            //checked={this.state.checkedItems.get(name)}
                            //selectedOptions
                            onChange={this.handleChange}
                            type="checkbox"
                            options={checkboxes}
                        />
                </div>
              </div>
          </form>
      </div>
  );
  }
}

export default ChildForm;
