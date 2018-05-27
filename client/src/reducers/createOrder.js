import {
    NOT_STARTED,
    LOADING,
    SUCCESS,
    ERROR,
} from './statusTypes';

const initialState = {
    status: NOT_STARTED,
    error: {}
};

const createOrder = function (state = initialState, action) {
    const { 
        type,
        payload,
    } = action;

    switch (type) {
        case 'CREATE_ORDER_PENDING': {
            return {
                ...state,
                status: LOADING,
            };
        }

        case 'CREATE_ORDER_RESOLVED': {
            const {
                message,
            } = payload;
            return {
                ...state,
                status: SUCCESS,
                message,
            };
        }

        case 'CREATE_ORDER_REJECTED': {
            const {
                error,
            } = payload;
            const message = error.response && error.response.data.message;
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

export default createOrder;
