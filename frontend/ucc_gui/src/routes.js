import React from 'react';
import { Route } from 'react-router-dom';

import ArticleList from './containers/ArticleListView';
import Register from "./components/Register/Register";
import ArticleDetail from './containers/ArticleDetailView';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/articles/:articleID' component={ArticleDetail} />
        <Route exact path='/register' component={Register} />
    </div>
);

export default BaseRouter;