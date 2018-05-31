const fs = require('fs');

module.exports = {
    fakeOrder: {
        make: 'inspiringbrandname',
        model: 'wile',
        packageLevel: 'elite',
    },
    badOrder: {
        make: 'inspiringbrandname',
        model: 'somecrazymodel',
        packageLevel: 'elite',
    },
    badOrderId: 'aaa',
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
        },
    },
    updatedOrderSchema: {
        required: ['_id', 'make', 'model', 'packageLevel', 'createdAt', 'supplierOrderId'],
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
            supplierOrderId: {
                type: 'string',
            },
        },
    },
    removeFile: (id) => {
        fs.unlink(`./orders/order-${id}.json`, error => {
            if (error) console.log(error);
            return null;
        });
    }
};
