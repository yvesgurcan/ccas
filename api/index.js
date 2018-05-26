const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const supplierRequest = require('./supplierRequest');

const app = express();

app.use(bodyParser.json({ extended: false }));

const hostname = 'localhost';
const port = 3000;

const catchError = function (error, res) {
  if (error.response) {
    console.error('An error occurred. Response details:\n', {
      resource: error.response.request.url,
      method: error.response.request.method,
      status: error.status,
      error: error.message,
      details: error.response.body,
    });
  }
  else {
    console.error('An error occurred:\n', error);
  }
  res.status(500);
  return res.send({
    message: 'An error occurred.'
  });
};

app.post('/order', (req, res) => {
  console.log('POST /order');
  const { make, model, packageLevel, customerId = null } = req.body;

  if (!make || !model || !packageLevel) {
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  const orderData = {
    make,
    model,
    packageLevel,
    customerId,
  };
  
  db.insertOrder(orderData)
    .then(() => {
      console.log('Order successfully created in the database.')
      return supplierRequest('acme', orderData)
    })
    .then(apiRes => {
        console.log('Order successfully sent to the supplier API.');
        return res.send({ message: 'Order successfully created.' });
    })
    .catch(error => catchError(error, res));
});

app.get('/orders', (req, res) => {
  console.log('GET /orders');
  db.fetchOrders()
    .then(orders => {
      console.log('Order data successfully retrieved.');
      return res.send({ orders });
    })
    .catch(error => catchError(error, res));
});

app.listen(port, hostname, () => console.log(`CCAS API listening at ${hostname}:${port}`));
