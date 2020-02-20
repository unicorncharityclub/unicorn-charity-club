import React, { Component } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import "../containers/Account/Account.css";
import "../containers/MyChildren/MyChildren.css";
import Arrow_backward from "./../image/arrow-backward.png";
import Upload_photo from "./../image/Default-profile-picture.png";


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
            UnicornName: this.props.UnicornName,
            UnicornPowers: this.props.UnicornPowers,
            ImpactEmblem: this.props.ImpactEmblem,
            Photo: this.props.Photo,
            finalImage: ''
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
            form_data.append('School', this.state.School);
            form_data.append('SchoolGrade', this.state.SchoolGrade);
            form_data.append('UnicornName', this.state.UnicornName);
            form_data.append('UnicornPowers', this.state.UnicornPowers);
            form_data.append('Photo', this.state.finalImage, this.state.finalImage.name);
        } catch(err) {
            console.log(err)
        }

        switch( requestType ) {
            case 'post':
            return axios.post('http://127.0.0.1:8000/childaccount/', form_data,
                    {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then(res => {console.log(res)})
                    .catch(error => console.log(error))
            case 'put':
                return axios.put(`http://127.0.0.1:8000/childaccount/${id}/`, form_data,
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
                      <input type="submit" form="child-form" value="Save"/>
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
                  {/*<hr className="form-separator"/>*/}
              </div>
              <div className="blessing-form">
                  <div className="blessing-name">Blessing: Helpful Hearts</div>
                  <div className="blessing-tagline">Color Horn Rand: Red</div>

                  <div className="blessing-info">
                      <label>Unicorn Name: </label>
                      <input type="text"
                             name="UnicornName"
                             placeholder="Unicorn Name"
                             value={this.defaultIfEmpty(this.state.UnicornName)}
                             onChange={this.changeHandler.bind(this)}
                      />
                      <label>Unicorn Powers: </label>
                      <textarea
                          name="UnicornPowers"
                          placeholder="What powers help you make a positive impact on the worked?"
                          value={this.defaultIfEmpty(this.state.UnicornPowers)}
                          onChange={this.changeHandler.bind(this)}
                      />
                  </div>
              </div>
          </form>
      </div>
  );
  }
}

export default ChildForm;
