import React, { Component } from "react";
import axios from 'axios';
//import { NavLink } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
  DatePicker
} from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";


/**
 * @description Fetches all the details of children associated with a parent account
 * @class MyChildren
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {MyChildren}
 * @example <MyChildren />
 * pre-condition: all the imports
 * post-condition: returns a form for all details of individual child
 * @param null
 * @returns {MyChildren}
 */

class MyChildren extends React.Component {

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

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/childaccount/')
            .then(res => {
                    this.setState({
                        Name: res.data[this.props.id].Name,
                        DOB: res.data[this.props.id].DOB,
                        School: res.data[this.props.id].School,
                        SchoolGrade: res.data[this.props.id].SchoolGrade,
                        UnicornName: res.data[this.props.id].UnicornName,
                        UnicornPowers: res.data[this.props.id].UnicornPowers
                    });
                console.log(res.data)
            })
    }

    changeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    defaultIfEmpty(value){
        return value === "" ? "":value;
    }

  render() {
    return (
        <Router>
      <form>
        <div className="form-wrapper">
          <div className="child-form">
            <label>Name:</label>
            <input type="text" name="name"
                   placeholder="First Name Last Name"
                   value={this.defaultIfEmpty(this.state.Name)}
                   onChange={this.changeHandler.bind(this)}
            />
          </div>
          <div className="child-form">
            <label>Birth Date: </label>
            <input
              type="date"
              name="date"
              placeholder="12 May 2012"
              value={this.defaultIfEmpty(this.state.DOB)}
              onChange={this.changeHandler.bind(this)}
            />
          </div>
          <div className="child-form">
            <label>School:</label>
            <input type="text"
                   name="school"
                   placeholder="School Name"
                   value={this.defaultIfEmpty(this.state.School)}
                   onChange={this.changeHandler.bind(this)}
            />
          </div>
          <div className="child-form" style={{ marginBottom: "20px" }}>
            <label>School Grade: </label>

            <select
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
          <hr className="form-separator" />
        </div>
        <div className="blessing-form">
          <div className="blessing-name">Blessing: Helpful Hearts</div>
          <div className="blessing-tagline">Color Horn Rand: Red</div>

          <div className="blessing-info">
            <label>Unicorn Name: </label>
            <input type="text"
                   name="Unicorn name"
                   placeholder="Unicorn Name"
                   value={this.defaultIfEmpty(this.state.UnicornName)}
                   onChange={this.changeHandler.bind(this)}
            />
            <label>Unicorn Powers: </label>
            <textarea
              name="Unicorn Powers"
              placeholder="What powers help you make a positive impact on the worked?"
              value={this.defaultIfEmpty(this.state.UnicornPowers)}
              onChange={this.changeHandler.bind(this)}
            />
            <label>Imacpt Emblem</label>
          </div>
        </div>
      </form>
        </Router>
    );
  }
}

export default MyChildren;
