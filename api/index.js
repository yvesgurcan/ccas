const express = require('express');
const bodyParser = require('body-parser');
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
    res.send({ message: 'Invalid request.' });
    return;
  }
  
  db.insertOrder(req.body, function (error) {
    if (error) {
      res.status = 500;
      res.send({ message: 'An error occurred. The order was not created.' });
      return;
    }

    // TODO: add supplier API requests

    res.send({ message: 'Order successfully created.' });
    return;
  });
});

app.get('/orders', (req, res) => {
  db.fetchOrders(function (error, orders) {
    if (error) {
      res.status = 500;
      res.send({ message: 'An error occurred. Could not fetch data.' });
      return;
    }

    res.send({ orders });
    return;
  });
});

app.listen(port, hostname, () => {
  console.log(`CCAS API listening at ${hostname}:${port}`);
});
