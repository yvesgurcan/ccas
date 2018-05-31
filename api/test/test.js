const app = require('../');
const db = require('../db');
const utils = require('./utils');
const chai = require('chai');
const request = require('superagent');
require('dotenv').load();
chai.use(require('chai-json-schema'));

const expect = chai.expect;

const { HOST_TEST, PORT_TEST, ROOT_TEST } = process.env;
const host = HOST_TEST || 'localhost';
const port = PORT_TEST || 3001;
const root = ROOT_TEST || '/api';
const apiUrl = `http://${host}:${port}${root}`;

const {
    fakeOrder,
    fakeSupplierOrderId,
    insertOrderSchema,
    processedOrderSuccessOutput,
    removeFile,
} = utils;

describe('service API', function () {
    let orderId = null;
    describe('GET /orders', function () {
        it('should return a list of orders', function (done) {
            request
                .get(`${apiUrl}/orders`)
                .then(result => {
                    expect(result.body).to.have.property('orders');
                    expect(result.body.orders).to.be.an('array');
                    done();
                })
                .catch(error => done(error));
        })
    })
    describe('POST /order', function () {
        it('should return ok, the id of the order, and a link to the order JSON data file', function (done) {
            request
                .post(`${apiUrl}/order`)
                .send(Object.assign({}, fakeOrder))
                .then(result => {
                    expect(result.ok).to.be.true;
                    expect(result.body.url).to.be.an('string');
                    expect(result.body.orderId).to.be.an('string');
                    orderId = result.body.orderId;
                    done();
                })
                .catch(error => {
                    console.log({response: error.response})
                    done(error)
                });
        })
    })
    describe('GET /orders/:id', function () {
        it('should return ok and the JSON data file', function (done) {
            request
                .get(`${apiUrl}/orders/${orderId}`)
                .send(Object.assign({}, fakeOrder))
                .then(result => {
                    expect(result.ok).to.be.true;
                    expect(result.body).to.be.an('object');
                    removeFile(orderId);
                    done();
                })
                .catch(error => done(error));
        })
    })
})

describe('database', function () {
    describe('insertOrder()', function () {
        it('should insert the order', function (done) {
            db.insertOrder(fakeOrder)
                .then(order => {
                    expect(order).to.be.jsonSchema(insertOrderSchema);
                    orderId = order._id;
                    done();
                })
                .catch(error => done(error));
        });
    });
    describe('addSupplierOrderId()', function () {
        it('should patch the order', function (done) {
            db.addSupplierOrderId(orderId, fakeSupplierOrderId)
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
