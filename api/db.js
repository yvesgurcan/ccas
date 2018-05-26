const mongoose = require('mongoose');

const address = 'mongodb://localhost/ccas';
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

module.exports = {
  insertOrder: (parameters, callback) => {
    connect(function () {
      const { make, model, packageLevel, customerId = null } = parameters;
      const newOrder = new Order({ make, model, packageLevel });
      newOrder.save(function (error) {
        if (error) console.error(error);
        else console.log('Order successfully created.');
        callback(error);
        return;
      });
    });
  },
  fetchOrders: (callback) => {
    connect(function () {
      Order.find(function (error, orders) {
        if (error) console.error(error);
        else console.log('Order data was successfully retrieved.');
        callback(error, orders);
        return orders;
      });
    });
  }
};
