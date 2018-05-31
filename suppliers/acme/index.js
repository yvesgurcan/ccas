const express = require('express');
const bodyParser = require('body-parser');
const log = require('./log');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3060;
const root = process.env.ROOT || '/acme/api/v45.1';
const ccasApiKey = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';

app.post(`${root}/order`, (req, res) => {
  log('POST /order');
  const apiKey = req.get('Api-Key');
  
  if (!apiKey) {
    log('No API key.');
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  if (apiKey !== ccasApiKey) {
    log('Invalid API key.');
    res.status(400);
    return res.send({ message: 'Invalid key.' });
  }

  log('API key is valid.');

  const { model, packageLevel } = req.body;
  if (!model || !packageLevel) {
    log('Some required parameters are missing.');
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  log('Request parameters are valid.');

  const order = String(Math.floor(Math.random() * 9999));
  log(`Randomly generated order id: ${order}`);

  res.send({ order });
});

app.listen(port, host, () => log(`Acme API listening at ${host}:${port}${root}`));

module.exports = app;
