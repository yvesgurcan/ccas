const mongoose = require('mongoose');

const address = 'mongodb://localhost/ccas-debug';
const connect = function (callback) {
  mongoose.connect(address);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connected to database.');
    callback();
  });
};

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  make: String,
  model: String,
  packageLevel: String,
  customerId: Number,
});
const Order = mongoose.model('Order', OrderSchema);

const catchError = function (error, callback) {
  console.error(error);
  return callback(error);
};

module.exports = {
  insertOrder: (parameters, callback) => {
    connect(function () {
      const { make, model, packageLevel, customerId = null } = parameters;
      const newOrder = new Order({make: { make, model, packageLevel }});
      newOrder.save()
        .then(() => callback())
        .catch(error => catchError(error, callback));
    });
  },
  fetchOrders: (callback) => {
    connect(function () {
      Order.find()
        .then(orders => callback(null, orders))
        .catch(error => catchError(error, callback));
    });
  }
};
