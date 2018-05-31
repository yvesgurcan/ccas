const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const { Order } = require('./model');
const log = require('./log');
require('dotenv').load();

const mockgoose = new Mockgoose(mongoose);
const address = process.env.DB;

const connect = function () {
    if (process.env.NODE_ENV === 'test') {
        return mockgoose.prepareStorage()
            .then(() => mongoose.connect(address)
            .catch(error => log(error, 'error')));
    }
    mongoose.connect(address).then(
        () => null,
        error => log({ message: 'An error occurred while connecting to the database:\n', error }, 'error')
    );
};

module.exports = {
    fetchOrders: () => Promise.resolve(connect()).then(() => Order.find()),
    insertOrder: orderData => Promise.resolve(connect()).then(() => new Order(orderData).save()),
    addSupplierOrderId: (orderId, supplierOrderId) =>
        Promise.resolve(connect()).then(() =>
            Order.update(
            { _id: orderId },
            { $set: { supplierOrderId } },
            null
        )
    ),
};
