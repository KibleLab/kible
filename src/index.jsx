import React from 'react';
import ReactDOM from 'react-dom';

import MenuSlct from './containers/MenuSlct';
import WishList from './containers/WishList';
import OrderSheet from './containers/OrderSheet';
import ErrorPage from './containers/ErrorPage';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({reducer: rootReducer, middleware: [sagaMiddleware]});
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/menu-slct/:table" component={MenuSlct} />
        <Route path="/ordersheet/:table" component={OrderSheet} />
        <Route path="/wishlist/:table" component={WishList} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
