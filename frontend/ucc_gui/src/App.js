import React, { Component } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import baseReducer from "./reducers/reducer"
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import UCC_APP from "./containers/UCC_App";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const store = createStore(baseReducer);

class App extends Component {
  render() {

    // optional cofiguration
    const options = {
      position: 'bottom center',
      timeout: 5000,
      offset: '30px',
      transition: 'scale'
    }


    return (
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
              <UCC_APP/>
          </AlertProvider>            
        </Provider>
    );
  }
}

export default App;
