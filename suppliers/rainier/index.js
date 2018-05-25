const express = require('express');

const app = express();

const hostname = 'localhost';
const port = 3051;
const root = '/rainier/api/v10.0';

app.get(root + '/nonce_token', (req, res) => {
  const { storefront } = req.query;
  res.send({nonce_token: 'ff6bfd673ab6ae03d8911'});
});

app.post(root + '/request_customized_model', (req, res) => {
  const { token, model, packageLevel } = req.body;
  res.send({order_id: "206"});
});

app.listen(port, hostname, () => {
  console.log(`Rainier API listening at ${hostname}${root}:${port}`);
});
