import { combineReducers } from 'redux';
import dashboard from './dashboard';
import createOrder from './createOrder';

const reducers = combineReducers({
    dashboard,
    createOrder,
});

export default reducers;
