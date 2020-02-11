import React from 'react';
import { Route } from 'react-router-dom';
import ArticleList from './containers/ArticleListView';
import ArticleDetail from './containers/ArticleDetailView';
import Account from './containers/Account/Account.js';
import MyChildren from "./containers/MyChildren/MyChildren";

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/articles/:articleID' component={ArticleDetail} />
        <Route exact path='/account/' component={Account} />
        {/*<Route exact path='/Menu/' component={Account} />*/}
        <Route exact path='/MyChildren/' component={() => <MyChildren id={0} />} />
    </div>
);

export default BaseRouter;