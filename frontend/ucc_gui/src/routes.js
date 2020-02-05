import React from 'react';
import { Route } from 'react-router-dom';

import ArticleList from './containers/ArticleListView';
import Register from "./components/Register/Register";
import ArticleDetail from './containers/ArticleDetailView';
import Account from './components/Account/Account.js';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/articles/:articleID' component={ArticleDetail} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/account/' component={Account} />
    </div>
);

export default BaseRouter;