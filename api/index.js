const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').load();
const db = require('./db');
const supplierRequest = require('./supplierRequest');
const createJSONFile = require('./createJSONFile');
const catchError = require('./catchError');
const log = require('./log');

const {
    NODE_ENV,
    HOST, PORT, ROOT,
    HOST_TEST, PORT_TEST, ROOT_TEST
} = process.env;

const host = (NODE_ENV === 'test' ? HOST_TEST : HOST) || 'localhost';
const port = (NODE_ENV === 'test' ? PORT_TEST : PORT) || 3000;
const root = (NODE_ENV === 'test' ? ROOT_TEST : ROOT) || '/api';

const app = express();
app.use(bodyParser.json({ extended: false }));
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get(`${root}/orders`, (req, res) => {
    log('GET /orders');
    db.fetchOrders()
        .then(unsortedOrders => {
            const orders = unsortedOrders.reverse();
            log('Order data successfully retrieved.');
            return res.send({ orders });
        })
        .catch(error => catchError(error, res));
});

app.get(`${root}/orders/:id`, (req, res) => {
    const { id } = req.params;
    log('GET /orders/:id');
    return res.download(`orders/order-${id}.json`);
});

app.post(`${root}/order`, (req, res) => {
    log('POST /order');
    const {
        make,
        model,
        packageLevel,
        customerId = null,
    } = req.body;

    if (!make || !model || !packageLevel) {
        log({ message: 'Some required parameters are missing.', body: req.body }, 'error');
        res.status(400);
        return res.send({ message: 'Invalid request.' });
    }
    
    let supplier = null;
    if (model === 'anvil' || model === 'wile' || model === 'roadrunner') {
        supplier = 'acme';
    } else if (model === 'pugetsound' || model === 'olympic') {
        supplier = 'rainier';
    } else {
        log({ message: `The supplier could not be identified for model '${model}'.` }, 'error');
        res.status(400);
        return res.send({ message: 'Invalid request.' });
    }

    const data = {
        make,
        model,
        packageLevel,
        customerId,
    };

    const orderData = Object.assign(data, { supplier });

    let orderId = null;
    let dbOrder = null;
    db.insertOrder(orderData)
        .then(order => {
            dbOrder = Object.assign({}, order._doc);
            log('Order successfully created in the database.');
            orderId = order._id;
            return supplierRequest(supplier, orderData);
        })
        .then(supplierOrderId => {
            log('Order successfully sent to the supplier.');
            return db.addSupplierOrderId(orderId, supplierOrderId);
        })
        .then(() => {
            return createJSONFile(`orders/order-${orderId}`, dbOrder);
        })
        .then(() => res.send({ message: 'Order successfully created.', url: `http://${host}:${port}${root}/orders/${orderId}`, orderId }))
        .catch(error => catchError(error, res));
});

app.listen(port, host, () => log(`CCAS API listening at ${host}:${port}${root}\n`));

module.exports = app;
