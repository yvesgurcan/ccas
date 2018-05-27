import {
    NOT_STARTED,
    LOADING,
    SUCCESS,
    ERROR,
} from './statusTypes';

const initialState = {
    orders: [],
    status: NOT_STARTED,
    error: {}
};

const dashboard = function (state = initialState, action) {
    const { 
        type,
        payload,
    } = action;

    switch (type) {
        case 'FETCH_ORDERS_PENDING': {
            return {
                ...state,
                status: LOADING,
            };
        }

        case 'FETCH_ORDERS_RESOLVED': {
            const {
                orders,
            } = payload;
            return {
                ...state,
                status: SUCCESS,
                orders,
            };
        }

        case 'FETCH_ORDERS_REJECTED': {
            const {
                error,
            } = payload;
            const message = error.response.data.message;
            return {
                ...state,
                status: ERROR,
                error: message || error.message,
            };
        }

        default: {
            return state;
        }
    }
};

export default dashboard;
