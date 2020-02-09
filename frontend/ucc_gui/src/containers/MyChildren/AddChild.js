import React, { Component } from "react";
//import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";


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

  render() {
    return (
        <Router>
      <form>
        <div className="form-wrapper">
          <div className="child-form">
            <label>Name:</label>
            <input type="text" name="name" placeholder="First Name Last Name" />
          </div>
          <div className="child-form">
            <label>Birth Date: </label>
            <input
              type="date"
              name="date"
              placeholder="12 May 2012"
              value={this.value}
              onChange={this.value}
            />
          </div>
          <div className="child-form">
            <label>School:</label>
            <input type="text" name="school" placeholder="School Name" />
          </div>
          <div className="child-form" style={{ marginBottom: "20px" }}>
            <label>School Grade: </label>

            <select
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
            <input type="text" name="Unicorn name" placeholder="Unicorn Name" />
            <label>Unicorn Powers: </label>
            <textarea
              name="Unicorn Powers"
              placeholder="What powers help you make a positive impact on the worked?"
            />
            <label>Imacpt Emblem</label>
          </div>
        </div>
      </form>
        </Router>
    );
  }
}

export default AddChild;
