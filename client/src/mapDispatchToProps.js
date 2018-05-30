import axios from 'axios';
import {
    fetchOrders,
    fetchOrdersResolved,
    fetchOrdersRejected,
} from './actions/dashboard';
import {
    createOrder,
    createOrderResolved,
    createOrderRejected,
    cleanUpStore,
} from './actions/createOrder';

const api = 'http://localhost:3000/api';

export default (dispatch, ownProps) => {
    return {
        fetchOrders: () => {
            dispatch(fetchOrders());
            axios.get(`${api}/orders`)
                .then(response => dispatch(fetchOrdersResolved({ orders: response.data.orders })))
                .catch(error => dispatch(fetchOrdersRejected({ error })));
        },
        submitOrder: (data) => {
            dispatch(createOrder());
            axios.post(`${api}/order`, { ...data })
                .then(response => dispatch(createOrderResolved({ message: response.data.message, url: response.data.url })))
                .catch(error => dispatch(createOrderRejected({ error })));
        },
        cleanUpStore: () => dispatch(cleanUpStore())
    };
};
