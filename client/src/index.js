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
import CreateOrder from './components/CreateOrder';

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
        <div>
            <h1>Central Cascade Automotive Sales</h1>
            <Router>
                <Switch>
                    <Route exact path="/order/new" component={CreateOrder} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
