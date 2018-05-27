export function createOrder() {
    return { type: 'CREATE_ORDER_PENDING' };
}

export function createOrderResolved(payload) {
    return { type: 'CREATE_ORDER_RESOLVED', payload };
}

export function createOrderRejected(payload) {
    return { type: 'CREATE_ORDER_REJECTED', payload };
}
