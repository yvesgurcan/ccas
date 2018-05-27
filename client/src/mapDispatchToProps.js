import axios from 'axios';
import {
    fetchOrders,
    receiveOrders,
    fetchOrdersFailed,
} from './actions/dashboard';

const api = 'http://localhost:3000';

export default (dispatch, ownProps) => {
    return {
        fetchOrders: () => {
            dispatch(fetchOrders());
            axios.get(`${api}/orders`)
                .then(response => dispatch(receiveOrders({ orders: response.data.orders })))
                .catch(error => dispatch(fetchOrdersFailed({ error })));
        },
        submitOrder: () => {
          // TODO
        }
    };
};
