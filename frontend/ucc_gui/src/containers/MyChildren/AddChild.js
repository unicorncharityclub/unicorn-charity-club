import React, { Component } from "react";
//import { NavLink } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
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

    saveHandler(event, id){
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
                UnicornPowers: UnicornPowers,
                ImpactEmblem: null,
                Photo: null

        })
        .then(res => console.log(res))
        .catch(error => console.log(error))

    }

  render() {
    return (
        <Router>
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
                      <input type="submit" form="add-form" value="Save"/>
                  </div>
              </div>
          </div>
          <form id="add-form" onSubmit={(event) => this.saveHandler(event)}>
            <div className="form-wrapper">
              <div className="child-form">
                <label>Name:</label>
                <input type="text" name="Name" placeholder="First Name Last Name" />
              </div>
              <div className="child-form">
                <label>Birth Date: </label>
                <input
                  type="date"
                  name="DOB"
                  placeholder="12 May 2012"
                  value={this.value}
                  onChange={this.value}
                />
              </div>
              <div className="child-form">
                <label>School:</label>
                <input type="text" name="School" placeholder="School Name" />
              </div>
              <div className="child-form" style={{ marginBottom: "20px" }}>
                <label>School Grade: </label>

                <select
                    name="SchoolGrade"
                  placeholder="Select School Grade"
                  onChange={this.state}
                  value={this.state}
                  className="child-form-select"
                >
                  <option value="Select School Grade">Select School Grade</option>
                  <option value="Kindergarden">Kindergarden</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                </select>
              </div>
              <hr className="form-separator" />
            </div>
            <div className="blessing-form">
              <div className="blessing-name">Blessing: Helpful Hearts</div>
              <div className="blessing-tagline">Color Horn Rand: Red</div>

              <div className="blessing-info">
                <label>Unicorn Name: </label>
                <input type="text" name="UnicornName" placeholder="Unicorn Name" />
                <label>Unicorn Powers: </label>
                <textarea
                  name="UnicornPowers"
                  placeholder="What powers help you make a positive impact on the worked?"
                />
                <label>Imacpt Emblem</label>
              </div>
            </div>
          </form>
          </div>
        </Router>
    );
  }
}

export default AddChild;
