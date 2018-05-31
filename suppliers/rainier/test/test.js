const app = require('../');
const utils = require('./utils');
const chai = require('chai');
const request = require('superagent');
require('dotenv').load();
const fakeTokens = require('../fakeTokens');

const expect = chai.expect;

const { HOST, PORT, ROOT } = process.env;
const host = HOST || 'localhost';
const port = PORT || 3051;
const root = ROOT || '/rainier/api/v10.0';
const apiUrl = `http://${host}:${port}${root}`;

const { fakeOrder } = utils;

describe('Rainier API', function () {
    describe('GET /nonce_token', function () {
        it('should return order id if request is valid', function (done) {
            request
                .get(`${apiUrl}/nonce_token`)
                .set('Storefront', 'ccas-bb9630c04f')
                .then(result => {
                    expect(result.ok).to.be.true;
                    expect(result.body.nonce_token).to.be.an('string');
                    done();
                })
                .catch(error =>  done(error));
        });

        it('should return 400 if missing storefront header', function (done) {
            request
                .get(`${apiUrl}/nonce_token`)
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });

        it('should return 400 if storefront header is invalid', function (done) {
            request
                .get(`${apiUrl}/nonce_token`)
                .set('Storefront', 'some-invalid-identifier')
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });
    });

    describe('POST /order', function () {
        it('should return order id if request is valid', function (done) {
            request
                .post(`${apiUrl}/request_customized_model`)
                .send(fakeOrder)
                .set('Token', fakeTokens[0])
                .then(result => {
                    expect(result.ok).to.be.true;
                    expect(result.body.order_id).to.be.an('string');
                    done();
                })
                .catch(error =>  done(error));
        });

        it('should return 400 if missing package level', function (done) {
            request
                .post(`${apiUrl}/request_customized_model`)
                .send(fakeOrder.model)
                .set('Token', fakeTokens[0])
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });

        it('should return 400 if missing model', function (done) {
            request
                .post(`${apiUrl}/request_customized_model`)
                .send(fakeOrder.packageLevel)
                .set('Token', fakeTokens[0])
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });

        it('should return 400 if token is invalid', function (done) {
            request
                .post(`${apiUrl}/request_customized_model`)
                .set('Token', 'bad-token')
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });
    });
});
