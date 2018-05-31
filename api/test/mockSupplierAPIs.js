const nock = require('nock');
const suppliers = require('../supplierData');

module.exports = {
    acme: {
        postOrder:
            nock(suppliers.acme.api)
                .post('/order')
                .reply(200, { order: '888' }),
    },
    rainier: {
        getToken:
            nock(suppliers.rainier.api)
                .get('/nonce_token')
                .reply(200, { nonce_token: 'abc123' }),
        postOrder:
            nock(suppliers.rainier.api)
                .post('/request_customized_model')
                .reply(200, { order: '777' }),
    }
};
