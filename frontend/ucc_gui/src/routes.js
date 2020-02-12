import React from "react";
import { Route } from "react-router-dom";

import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";
import Account from "./containers/Account/Account.js";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";


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
            </div>
          );
        case "unregistered":
        default:
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
