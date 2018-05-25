const express = require('express');

const app = express();

const hostname = 'localhost';
const port = 3000;

const acmeApiKey = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';
const rainierStorefront = 'ccas-bb9630c04f';

app.post('/order', (req, res) => {
  const { make, model, packageLevel, customer_id } = req.body;
  res.send();
});

app.get('/orders', (req, res) => {
  res.send();
});

app.listen(port, hostname, () => {
  console.log(`CCAS API listening at ${hostname}:${port}`);
});
