import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Router from 'react-router-dom/HashRouter';
import { Route, Switch } from 'react-router-dom';
import rootReducer from './reducers';

import Dashboard from './components/Dashboard';
import Order from './components/Order';

import './style/main.scss';

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
);

const store = createStore(
    rootReducer,
    middleware
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/order/new" component={Order} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
