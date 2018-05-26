const request = require('superagent');

const suppliers = {
  acme: {
    api: 'http://localhost:3050/acme/api/v45.1/order',
    apiKey: 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6',
  },
  rainier: {
    api: 'http://localhost:3051/rainier',
    storefront: 'ccas-bb9630c04f',
  }
};

const extractSupplierOrderId = function (supplier, apiRes) {
  if (supplier === 'acme') {
    return apiRes.body.order;
  }
  return apiRes.body.orderId;
};

module.exports = function (supplier, order) {
  console.log(`Sending request to supplier '${supplier}'.`);
  switch (supplier) {
    default: {
      throw Error('Invalid supplier.');
    }
    case 'acme': {
      return request.post(suppliers[supplier].api)
        .set('Api-Key', suppliers[supplier].apiKey)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(order)
        .then((apiRes) => extractSupplierOrderId(supplier, apiRes));
    }
    case 'rainier': {
      return request.post(suppliers[supplier].api)
      .send(order);
    }
  }
};
