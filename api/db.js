const mongoose = require('mongoose');

const address = 'mongodb://localhost/ccas-dbg';
const connect = function () {
    mongoose.connect(address).then(
        () => null,
        error => console.error('An error occurred while connecting to the database:\n', error)
    );
};

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    make: String,
    model: String,
    packageLevel: String,
    customerId: Number,
    supplier: String,
    supplierOrderId: String,
},
{
    timestamps: true,
});
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
    fetchOrders: () => Promise.resolve(connect()).then(() => Order.find()),
    insertOrder: (orderData) => Promise.resolve(connect()).then(() => new Order(orderData).save()),
    addSupplierOrderId: (orderId, supplierOrderId) =>
        Promise.resolve(connect()).then(() =>
            Order.update(
            { _id: orderId },
            { $set: { supplierOrderId } },
            null
        )
    ),
};
