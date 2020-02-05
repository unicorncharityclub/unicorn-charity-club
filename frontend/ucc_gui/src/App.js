import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import CustomLayout from './containers/Layout';
import Navbar from "./components/Navbar/Navbar";

/** importing CSS styles */
//import 'antd/dist/antd.css';
import "./App.css";


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content-wrapper">
          <Router>
            <Navbar />
            <CustomLayout>
              <BaseRouter />
            </CustomLayout>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
