module.exports = {
    fakeOrder: {
        make: 'beautifulcar',
        model: 'roadrunner',
        packageLevel: 'std',
    },
    fakeOrderId: null,
    fakeSupplierOrderId: '999',
    insertOrderSchema: {
        required: ['_id', 'make', 'model', 'packageLevel', 'createdAt'],
        properties: {
            _id: {
                type: 'object',
            },
            make: {
                type: 'string',
            },
            model: {
                type: 'string',
            },
            packageLevel: {
                type: 'string',
            },
            createdAt: {
                type: 'object',
                format: 'date-time',
            },
        }
    },
    processedOrderSuccessOutput: { ok: 1, nModified: 1, n: 1 },
}