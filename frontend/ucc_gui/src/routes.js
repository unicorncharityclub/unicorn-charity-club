import React from "react";
import { Route } from "react-router-dom";

import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";
import Account from "./containers/Account/Account.js";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import MyChildren from "./containers/MyChildren/MyChildren";

class BaseRouter extends React.Component {
    render() {
        switch (this.props.userState) {
        case "registered":
          return (
            <div>
              <Route exact path="/" component={ArticleList} />
              <Route exact path="/articles/:articleID" component={ArticleDetail}
              />
              <Route exact path="/account" component={Account} />
              <Route exact path='/MyChildren/:id' component={MyChildren} />
            </div>
          );
        default:
        case "unregistered":
          return (
            <div>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
          );
      }
    }
}

export default BaseRouter;
