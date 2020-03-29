import React, {Component} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Template/Navbar/Navbar";
import Header from "./Template/Header/Header";
import BaseRouter from "../routes";
import RegisterBannerImage from "../components/Account/Register/RegisterBannerImage";
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class UCC_App extends Component {
    constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if(cookie.load('user_email')!==undefined)
    {
        this.props.dispatch({ type: "LOGIN_SUCCESS", user_list:cookie.load('user_list'), token:cookie.load('XSRF-TOKEN')});
    }
  }


    render() {

    return (      
      <Router>        
        {this.props.token !== '' ? (
          <div className="App">
            <div className="content-wrapper">
              <Header />
              <Navbar />
              <BaseRouter userState="registered" appState={this.state}/>
            </div>
          </div>
        ) : (
          <div className="App">
            <RegisterBannerImage/>
            <BaseRouter userState="unregistered" appState={this.state}/>
          </div>
        )}        
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.userEmail,
    token: state.token
  };
}

export default connect(mapStateToProps)(UCC_App);