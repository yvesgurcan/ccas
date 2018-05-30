const express = require('express');
const bodyParser = require('body-parser');
const fakeTokens = require('./fakeTokens');

const app = express();
app.use(bodyParser.json({ extended: false }));


const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3051;
const root = process.env.ROOT || '/rainier/api/v10.0';
const ccasStorefront = 'ccas-bb9630c04f';

const getToken = () => {
  const randomTokenIndex = Math.floor(Math.random() * (fakeTokens.length));
  return fakeTokens[randomTokenIndex];
};

const tokenIsValid = (token) => {
  return fakeTokens.indexOf(token) > -1;
};

app.get(`${root}/nonce_token`, (req, res) => {
  console.log('GET /nonce_token');
  const storefront = req.get('Storefront');

  if (!storefront) {
    console.log('No storefront ID.');
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  if (storefront !== ccasStorefront) {
    console.log('Invalid storefront ID.');
    res.status(400);
    return res.send({ message: 'Invalid storefront ID.' });
  }

  res.send({ nonce_token: getToken() });
});

app.post(`${root}/request_customized_model`, (req, res) => {
  console.log('POST /request_customized_model');
  const token = req.get('Token');

  if (!token) {
    console.log('No token.');
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  if (!tokenIsValid(token)) {
    console.log('Invalid token.');
    res.status(400);
    return res.send({ message: 'Invalid token.' });
  }

  const { model, packageLevel } = req.body;
  if (!model || !packageLevel) {
    console.log('Some required parameters are missing.');
    res.status(400);
    return res.send({ message: 'Invalid request.' });
  }

  console.log('Request parameters are valid.');

  const order_id = Math.floor(Math.random() * 999);
  console.log(`Randomly generated order id: ${order_id}`);

  res.send({ order_id });
});

app.listen(port, host, () => console.log(`Rainier API listening at ${host}:${port}${root}`));
