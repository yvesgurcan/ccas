const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

const hostname = 'localhost';
const port = 3050;
const root = '/acme/api/v45.1';

const ccasApiKey = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';

app.post(`${root}/order`, (req, res) => {
  const apiKey = req.get('Api-Key');
  
  if (!apiKey) {
    res.status(400);
    console.log(res.status);
    return res.send({ message: 'Invalid request.' });
  }

  if (apiKey !== ccasApiKey) {
    res.status(400);
    return res.send({ message: 'Invalid key.' });
  }


  const { model, packageLevel } = req.body;
  res.send({ order: '1000' });
});

app.listen(port, hostname, () => {
  console.log(`Acme API listening at ${hostname}${root}:${port}`);
});
