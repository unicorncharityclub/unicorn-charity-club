import React, { Component } from "react";
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";
import ChildForm from "../../components/ChildForm"


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


  render() {
      return (
          <div>
            <ChildForm Name={this.state.Name}
                       DOB={this.state.DOB}
                       School={this.state.School}
                       SchoolGrade={this.state.SchoolGrade}
                       UnicornName={this.state.UnicornName}
                       UnicornPowers={this.state.UnicornPowers}
                       ImpactEmblem={this.state.ImpactEmblem}
                       Photo={this.state.Photo}
                requestType="post" id={null}/>
          </div>
      )
  }
}

export default AddChild;
