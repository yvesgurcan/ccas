const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const hostname = 'localhost';
const port = 3050;
const root = '/acme/api/v45.1';

const ccasApiKey = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';

app.post(`${root}/order`, (req, res) => {
  console.log('POST /order');
  const apiKey = req.get('Api-Key');
  
  if (!apiKey) {
    console.log('No API key.');
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  if (apiKey !== ccasApiKey) {
    console.log('Invalid API key.');
    res.status(400);
    return res.send({ message: 'Invalid key.' });
  }

  console.log('API key is valid.');

  const { model, packageLevel } = req.body;
  if (!model || !packageLevel) {
    console.log('Some required parameters are missing.');
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  console.log('Request parameters are valid.');

  const order = Math.floor(Math.random() * 9999);
  console.log(`Randomly generated order id: ${order}`);

  res.send({ order });
});

app.listen(port, hostname, () => {
  console.log(`Acme API listening at ${hostname}${root}:${port}`);
});
