const Mongoose = require('mongoose').Mongoose;
const Mockgoose = require('mockgoose').Mockgoose;
const db = require('../db');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-json-schema'));

const mongoose = new Mongoose();
const mockgoose = new Mockgoose(mongoose);

const fakeOrder = {
    make: 'beautifulcar',
    model: 'roadrunner',
    packageLevel: 'std',
};

let fakeOrderId = null;
const fakeSupplierOrderId = '999';

const insertOrderSchema = {
    required: ['_id', 'make', 'model', 'packageLevel', 'createdAt'],
    properties: {
        _id: {
            type: 'object',
        },
        make: {
            type: 'string',
        },
        model: {
            type: 'string',
        },
        packageLevel: {
            type: 'string',
        },
        createdAt: {
            type: 'object',
            format: 'date-time',
        },
    }
};

const processedOrderSuccessOutput = { ok: 1, nModified: 1, n: 1 };

describe('database', function () {
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
