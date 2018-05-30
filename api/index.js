const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').load();
const db = require('./db');
const supplierRequest = require('./supplierRequest');
const createJSONFile = require('./createJSONFile');
const catchError = require('./catchError');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const root = process.env.ROOT || '/api';

const app = express();
app.use(bodyParser.json({ extended: false }));
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get(`${root}/orders`, (req, res) => {
    console.log('GET /orders');
    db.fetchOrders()
        .then(unsortedOrders => {
            const orders = unsortedOrders.reverse();
            console.log('Order data successfully retrieved.');
            return res.send({ orders });
        })
        .catch(error => catchError(error, res));
});

app.get(`${root}/orders/:id`, (req, res) => {
    const { id } = req.params;
    console.log('GET /orders/:id');
    return res.download(`orders/order-${id}.json`);
});

app.post(`${root}/order`, (req, res) => {
    console.log('POST /order');
    const {
        make,
        model,
        packageLevel,
        customerId = null,
    } = req.body;

    if (!make || !model || !packageLevel) {
        console.error('Some required parameters are missing.', req.body);
        res.status(400);
        return res.send({ message: 'Invalid request.' });
    }
    
    let supplier = null;
    if (model === 'anvil' || model === 'wile' || model === 'roadrunner') {
        supplier = 'acme';
    } else if (model === 'pugetsound' || model === 'olympic') {
        supplier = 'rainier';
    } else {
        console.error(`The supplier could not be identified for model '${model}'.`);
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
            console.log('Order successfully created in the database.');
            orderId = order._id;
            return supplierRequest(supplier, orderData);
        })
        .then(supplierOrderId => {
            console.log('Order successfully sent to the supplier.');
            return db.addSupplierOrderId(orderId, supplierOrderId);
        })
        .then(() => {
            return createJSONFile(`orders/order-${orderId}`, dbOrder);
        })
        .then(() => res.send({ message: 'Order successfully created.', url: `http://${host}:${port}${root}/orders/${orderId}` }))
        .catch(error => catchError(error, res));
});

app.listen(port, host, () => console.log(`CCAS API listening at ${host}:${port}${root}\n`));
