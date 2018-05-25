const express = require('express');

const app = express();

const hostname = 'localhost';
const port = 3000;

app.post('/order', (req, res) => {
  res.send();
});

app.get('/orders', (req, res) => {
  res.send();
});

app.listen(port, hostname, () => {
  console.log(`CCAS API listening at ${hostname}:${port}`);
});
