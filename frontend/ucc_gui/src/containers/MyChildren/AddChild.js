import React, { Component } from "react";
//import { NavLink } from "react-router-dom";
import {
  DatePicker
} from "react-bootstrap";
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";
import Arrow_backward from "../../image/arrow-backward.png";
import axios from "axios";


/**
 * @description Creates a form for all details of individual child
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
class AddChild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            DOB: "",
            School: "",
            SchoolGrade: "",
            UnicornName: "",
            UnicornPowers: "",
            ImpactEmblem: "",
            Photo: "",
        }
    }

    defaultIfEmpty(value){
        return value === "" ? "":value;
    }

    imageHandler(event){
        this.setState({
            ImpactEmblem: event.target.files[0]
        })
        console.log(event.target.files[0])
    }

    saveHandler(event){
        event.preventDefault();
        const Name = event.target.elements.Name.value;
        const DOB = event.target.elements.DOB.value;
        const School = event.target.elements.School.value;
        const SchoolGrade = event.target.elements.SchoolGrade.value;
        const UnicornName = event.target.elements.UnicornName.value;
        const UnicornPowers = event.target.elements.UnicornPowers.value;
        console.log(Name, DOB, School, SchoolGrade, UnicornName, UnicornPowers);

        return axios.post('http://127.0.0.1:8000/childaccount/', {
                Name: Name,
                DOB: DOB,
                School: School,
                SchoolGrade: SchoolGrade,
                UnicornName: UnicornName,
                UnicornPowers: UnicornPowers

        })
        .then(res => console.log(res))
        .catch(error => console.log(error))

    }

    changeHandler(event){
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
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
                      <input type="submit" form="update-form" value="Save"/>
                  </div>
              </div>
          </div>
          <form id="update-form" onSubmit={(event) => this.saveHandler(event, this.props.match.params.id)}>
              <div className="form-wrapper">
                  <div className="child-form">
                      <label>Name:</label>
                      <input type="text" name="Name"
                             placeholder="First Name Last Name"
                             value={this.defaultIfEmpty(this.state.Name)}
                             onChange={this.changeHandler.bind(this)}
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

                      <select
                          name="SchoolGrade"
                          placeholder="Select School Grade"
                          onChange={this.changeHandler.bind(this)}
                          value={this.defaultIfEmpty(this.state.SchoolGrade)}
                          className="child-form-select"
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
                  <hr className="form-separator"/>
              </div>
              <div className="blessing-form">
                  <div className="blessing-name">Blessing: {this.props.blessing_group}</div>
                  <div className="blessing-tagline">Color Horn Rank: {this.props.color_horn_rank}</div>

                  <div className="blessing-info">
                      <label>Unicorn Name: </label>
                      <input type="text"
                             name="UnicornName"
                             placeholder="Unicorn Name"
                             value={this.defaultIfEmpty(this.state.UnicornName)}
                             onChange={this.changeHandler.bind(this)}
                      />
                      <label>Imacpt Emblem</label>
                      <input style={{display: 'none'}}
                             type="file"
                             name="ImpactEmblem"
                             //value={this.defaultIfEmpty(this.state.ImpactEmblem)}
                             accept=".png, .jpeg, .jpg"
                             onChange={this.imageHandler.bind(this)}
                            ref={imageInput => this.imageInput = imageInput}>
                      </input>
                      <button onClick={() =>  this.imageInput.click()}>Upload Photo</button>
                  </div>
              </div>
          </form>
      </div>
    );
  }
}

export default AddChild;
