export function fetchOrders() {
    return { type: 'FETCH_ORDERS_PENDING' };
}

export function fetchOrdersResolved(payload) {
    return { type: 'FETCH_ORDERS_RESOLVED', payload };
}

export function fetchOrdersRejected(payload) {
    return { type: 'FETCH_ORDERS_REJECTED', payload };
}
