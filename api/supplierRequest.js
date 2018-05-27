const request = require('superagent');

const suppliers = {
    acme: {
        api: 'http://localhost:3050/acme/api/v45.1',
        apiKey: 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6',
    },
    rainier: {
        api: 'http://localhost:3051/rainier/api/v10.0',
        storefront: 'ccas-bb9630c04f',
    }
};

const extractSupplierOrderId = function (supplier, apiRes) {
  const {
      order,
      order_id,
      orderId,
  } = apiRes.body;
  return order || order_id || orderId || null;
};

module.exports = function (supplier, order) {
    console.log(`Sending request to supplier '${supplier}'.`);
    switch (supplier) {
        default: {
            throw Error('Invalid supplier.');
        }
        case 'acme': {
            return request.post(`${suppliers[supplier].api}/order`)
                .set('Api-Key', suppliers[supplier].apiKey)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(order)
                .then((apiRes) => extractSupplierOrderId(supplier, apiRes));
        }
        case 'rainier': {
            return request.get(`${suppliers[supplier].api}/nonce_token`)
                .set('Storefront', suppliers[supplier].storefront)
                .then((tokenRes) => {
                    const { nonce_token } = tokenRes.body;
                    if (!nonce_token) {
                      throw new Error('Supplier API did not provide a token.');
                    }
                    return request.post(`${suppliers[supplier].api}/request_customized_model`)
                    .set('Token', nonce_token)
                    .send(order)
                    .then((apiRes) => extractSupplierOrderId(supplier, apiRes));
                });
        }
    }
};
