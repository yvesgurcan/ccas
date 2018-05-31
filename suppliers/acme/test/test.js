const app = require('../');
const utils = require('./utils');
const chai = require('chai');
const request = require('superagent');
require('dotenv').load();

const expect = chai.expect;

const { HOST_TEST, PORT_TEST, ROOT_TEST } = process.env;
const host = HOST_TEST || 'localhost';
const port = PORT_TEST || 3050;
const root = ROOT_TEST || '/acme/api/v45.1';
const apiUrl = `http://${host}:${port}${root}`;

const { fakeOrder } = utils;

describe('ACME API', function () {
    describe('POST /order', function () {
        it('should return order id if request is valid', function (done) {
            request
                .post(`${apiUrl}/order`)
                .set('Api-Key', 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(fakeOrder)
                .then(result => {
                    expect(result.ok).to.be.true;
                    expect(result.body.order).to.be.an('string');
                    done();
                })
                .catch(error => done(error));
        })

        it('should return 400 if Content-Type header is not set', function (done) {
            request
                .post(`${apiUrl}/order`)
                .set('Api-Key', 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6')
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });

        it('should return 400 if missing API key', function (done) {
            request
                .post(`${apiUrl}/order`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });

        it('should return 400 if API key is invalid', function (done) {
            request
                .post(`${apiUrl}/order`)
                .set('API-Key', 'some-bad-key')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((error, result) => {
                    expect(result.ok).to.be.false;
                    expect(result.statusCode).to.equal(400);
                    done();
                });
        });
        
        
    });
});
