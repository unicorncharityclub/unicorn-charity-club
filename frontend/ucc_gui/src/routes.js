import React from "react";
import { Route } from "react-router-dom";

import Account from "./containers/Account/Account.js";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import MyChildren from "./containers/MyChildren/MyChildren";
import Payment from "./containers/Payment/Payment";
import Terms_and_Conditions from "./containers/Terms_and_Conditions/Terms_and_Conditions";
import Security_and_Privacy from "./containers/Security_and_Privacy/Security_and_Privacy";
import Feeds from "./containers/Feeds/Feeds";

class BaseRouter extends React.Component {
    render() {
        switch (this.props.userState) {
        case "registered":
          return (
            <div>
              <Route exact path="/" component={Feeds} />
              <Route exact path="/Account" component={Account} />
              <Route exact path='/Menu/Payment' component={Payment} />
              <Route exact path='/Menu/Terms_and_Conditions' component={Terms_and_Conditions} />
              <Route exact path='/Menu/Security_and_Privacy' component={Security_and_Privacy} />
              <Route exact path='/MyChildren/:id' component={MyChildren} />
            </div>
          );
        default:
        case "unregistered":
          return (
            <div>
              <Route exact path="/" render={(props) => <Login {...props} appState={this.props.appState} />}  />
              <Route exact path="/register" component={Register} />
            </div>
          );
      }
    }
}

export default BaseRouter;
