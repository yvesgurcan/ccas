const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');
const db = require('./db');

const app = express();

app.use(bodyParser.json({ extended: false }));

const hostname = 'localhost';
const port = 3000;

const acmeApiKey = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';
const rainierStorefront = 'ccas-bb9630c04f';

app.post('/order', (req, res) => {
  const { make, model, packageLevel, customerId = null } = req.body;

  if (!make || !model || !packageLevel) {
    res.status = 400;
    return res.send({ message: 'Invalid request.' });
  }
  
  db.insertOrder(req.body, function (error) {
    if (error) {
      res.status = 500;
      return res.send({ message: 'An error occurred. The order was not created.' });
    }

    // TODO: add supplier API requests

    console.log('Order successfully created.');
    return res.send({ message: 'Order successfully created.' });
  });
});

app.get('/orders', (req, res) => {
  db.fetchOrders(function (error, orders) {
    console.log(error)
    if (error) {
      res.status = 500;
      return res.send({ message: 'An error occurred. Could not fetch data.' });
    }

    console.log('Order data successfully retrieved.');
    return res.send({ orders });
  });
});

app.listen(port, hostname, () => {
  console.log(`CCAS API listening at ${hostname}:${port}`);
});
