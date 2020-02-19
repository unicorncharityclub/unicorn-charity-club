import React, { Component } from "react";
import axios from 'axios';
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import "../Account/Account.css";
import "./MyChildren.css";
import ChildForm from "../../components/ChildForm"


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
        const id = this.props.match.params.id;
        axios.get(`http://127.0.0.1:8000/childaccount/${id}`)
            .then(res => {
                    this.setState({
                        Name: res.data.Name,
                        DOB: res.data.DOB,
                        School: res.data.School,
                        SchoolGrade: res.data.SchoolGrade,
                        UnicornName: res.data.UnicornName,
                        UnicornPowers: res.data.UnicornPowers,
                        ImpactEmblem: res.data.ImpactEmblem,
                        Photo: res.data.Photo
                    });
                console.log(res.data)
            })
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
                requestType="put" id={this.props.match.params.id}/>
          </div>
      )
  }
}

export default MyChildren;
