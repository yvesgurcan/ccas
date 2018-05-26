const mongoose = require('mongoose');

const address = 'mongodb://localhost/ccas-debug';
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
});
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
  fetchOrders: () => Promise.resolve(connect()).then(() => Order.find()),
  insertOrder: (orderData) => Promise.resolve(connect()).then(() => new Order(orderData).save()),
};
