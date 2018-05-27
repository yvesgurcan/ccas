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
} from './actions/createOrder';

const api = 'http://localhost:3000';

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
                .then(response => dispatch(createOrderResolved({ data: response.data })))
                .catch(error => dispatch(createOrderRejected({ error })));
        }
    };
};
