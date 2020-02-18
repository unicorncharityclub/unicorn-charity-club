import React, { Component } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import "../containers/Account/Account.css";
import "../containers/MyChildren/MyChildren.css";
import Arrow_backward from "./../image/arrow-backward.png";


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

class ChildForm extends React.Component {



    changeHandler = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
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

    saveHandler(event,  requestType, id){
        event.preventDefault();
        const Name = event.target.elements.Name.value;
        const DOB = event.target.elements.DOB.value;
        const School = event.target.elements.School.value;
        const SchoolGrade = event.target.elements.SchoolGrade.value;
        const UnicornName = event.target.elements.UnicornName.value;
        const UnicornPowers = event.target.elements.UnicornPowers.value;

        console.log(Name, DOB, School, SchoolGrade, UnicornName, UnicornPowers);

        switch( requestType ) {
            case 'post':
            return axios.post('http://127.0.0.1:8000/childaccount/',
                    {
                        Name: Name,
                        DOB: DOB,
                        School: School,
                        SchoolGrade: SchoolGrade,
                        UnicornName: UnicornName,
                        UnicornPowers: UnicornPowers

                    })
                    .then(res => console.log(res))
                    .catch(error => console.log(error))
            case 'put':
                return axios.put(`http://127.0.0.1:8000/childaccount/${id}/`,
                    {
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
                  <div className="child-form">
                      <label>Name:</label>
                      <input type="text" name="Name"
                             placeholder="First Name Last Name"
                             value={this.defaultIfEmpty(this.props.Name)}
                             onChange={this.changeHandler.bind(this)}
                      />
                  </div>
                  <div className="child-form">
                      <label>Birth Date: </label>
                      <input
                          type="date"
                          name="DOB"
                          placeholder="12 May 2012"
                          value={this.defaultIfEmpty(this.props.DOB)}
                          onChange={this.changeHandler.bind(this)}
                      />
                  </div>
                  <div className="child-form">
                      <label>School:</label>
                      <input type="text"
                             name="School"
                             placeholder="School Name"
                             value={this.defaultIfEmpty(this.props.School)}
                             onChange={this.changeHandler.bind(this)}
                      />
                  </div>
                  <div className="child-form" style={{marginBottom: "20px"}}>
                      <label>School Grade: </label>

                      <select className="child-form-select"
                          name="SchoolGrade"
                          placeholder="Select School Grade"
                          value={this.defaultIfEmpty(this.props.SchoolGrade)}
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
                  <hr className="form-separator"/>
              </div>
              <div className="blessing-form">
                  <div className="blessing-name">Blessing: Helpful Hearts</div>
                  <div className="blessing-tagline">Color Horn Rand: Red</div>

                  <div className="blessing-info">
                      <label>Unicorn Name: </label>
                      <input type="text"
                             name="UnicornName"
                             placeholder="Unicorn Name"
                             value={this.defaultIfEmpty(this.props.UnicornName)}
                             onChange={this.changeHandler.bind(this)}
                      />
                      <label>Unicorn Powers: </label>
                      <textarea
                          name="UnicornPowers"
                          placeholder="What powers help you make a positive impact on the worked?"
                          value={this.defaultIfEmpty(this.props.UnicornPowers)}
                          onChange={this.changeHandler.bind(this)}
                      />
                      <label>Impact Emblem</label>
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

export default ChildForm;
