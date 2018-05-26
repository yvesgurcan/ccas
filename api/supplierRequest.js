const request = require('superagent');

const acmeApiKey = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';
const rainierStorefront = 'ccas-bb9630c04f';

module.exports = function (supplier, data) {
  if (supplier === 'acme') {
    return request.post('http://localhost:3050/acme/api/v45.1/order')
    .send(data)
    .set('Content-Type', 'application/x-www-form-urlencoded');  
  }
  else if (supplier === 'rainier') {
    return request.post('http://localhost:3051/rainier')
    .send(data);
  }
  throw Error('Invalid supplier.');
};
