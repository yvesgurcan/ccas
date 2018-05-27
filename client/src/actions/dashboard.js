export function fetchOrders() {
    return { type: 'FETCH_ORDERS_PENDING' };
}

export function receiveOrders(payload) {
    return { type: 'FETCH_ORDERS_RESOLVED', payload };
}

export function fetchOrdersFailed(payload) {
    return { type: 'FETCH_ORDERS_REJECTED', payload };
}