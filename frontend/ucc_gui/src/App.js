import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import Navbar from "./components/Navbar/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content-wrapper">
          <Router>
            <Navbar />
                <a href="/account">My Account Page</a>
              <BaseRouter />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
