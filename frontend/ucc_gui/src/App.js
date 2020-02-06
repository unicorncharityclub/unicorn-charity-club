import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import "./App.css";

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      //user: {}
    };
  }

  render() {
    return (
      <Router>
        {this.state.user ? (
          <div className="App">
            <div className="content-wrapper">
              <Navbar />
              <a href="/account">My Account Page</a>
              <BaseRouter />
            </div>
          </div>
        ) : (
          <div className="App">
            <Register />
          </div>
        )}
      </Router>
    );
  }
}

export default App;
