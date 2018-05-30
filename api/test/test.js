const app = require('../');
const db = require('../db');
const utils = require('./utils');
const assert = require('assert');
const chai = require('chai');

const expect = chai.expect;
chai.use(require('chai-json-schema'));



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
