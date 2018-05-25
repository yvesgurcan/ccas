const express = require('express');

const app = express();

const hostname = 'localhost';
const port = 3050;
const root = '/acme/api/v45.1';

app.post(root + '/order', (req, res) => {
  const { api_key, model, packageLevel } = req.body;
  res.send({order: "1000"});
});

app.listen(port, hostname, () => {
  console.log(`Acme API listening at ${hostname}${root}:${port}`);
});
