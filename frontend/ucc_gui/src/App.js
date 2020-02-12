import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Navbar from "./containers/Navbar/Navbar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterBannerImage from "./components/Register/RegisterBannerImage";

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <Router>
        {this.state.user ? (
          <div className="App">
            <div className="content-wrapper">
              <Navbar />
              <BaseRouter userState="registered"/>
                <a href="/account">My Account Page</a>
                <a href="/MyChildren">My Children</a>
            </div>
          </div>
        ) : (
          <div className="App">
            <RegisterBannerImage/>
            <BaseRouter userState="unregistered"/>
          </div>
        )}
      </Router>
    );
  }
}

export default App;
