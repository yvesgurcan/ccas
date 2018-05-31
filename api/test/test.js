const app = require('../');
const db = require('../db');
const utils = require('./utils');
const assert = require('assert');
const axios = require('axios');
require('dotenv').load();

const chai = require('chai');

const expect = chai.expect;
chai.use(require('chai-json-schema'));

const { HOST_TEST, PORT_TEST, ROOT_TEST } = process.env;

const host = HOST_TEST || 'localhost';
const port = PORT_TEST || 3001;
const root = ROOT_TEST || '/api';
const apiUrl = `http://${host}:${port}${root}`;

describe('service API', function () {
    describe.skip('GET /orders', function () {
        it('should return a list of orders', function (done) {
            axios.get(`${apiUrl}/orders`)
                .then(result => {
                    expect(result.data).to.have.property('orders');
                    expect(result.data.orders).to.be.an('array');
                    done();
                })
                .catch(error => done(error));
        })
    })
    describe('POST /order', function () {
        it('should return ok and a link to the order JSON data file', function (done) {
            axios.post(`${apiUrl}/order`)
                .then(result => {
                    expect(result.ok).to.be.true;
                    done();
                })
                .catch(error => done(error));
        })
    })
})

describe.skip('database', function () {
    describe('insertOrder()', function () {
        it('should insert the order', function (done) {
            db.insertOrder(fakeOrder)
                .then(order => {
                    expect(order).to.be.jsonSchema(insertOrderSchema);
                    fakeOrderId = order._id;
                    done();
                })
                .catch(error => done(error));
        });
    });
    describe('addSupplierOrderId()', function () {
        it('should patch the order', function (done) {
            db.addSupplierOrderId(fakeOrderId, fakeSupplierOrderId)
                .then((output) => {
                    expect(output).to.be.eql(processedOrderSuccessOutput);
                    done();
                })
                .catch(error => done(error));
        });
    });
    describe('fetchOrders()', function () {
        it('should return orders in the database', function (done) {
            db.fetchOrders()
                .then(orders => {
                    done();
                })
                .catch(error => done(error));
        });
    });
});
