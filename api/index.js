const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const supplierRequest = require('./supplierRequest');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(bodyParser.json({ extended: false }));

// CORS
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

const catchError = function (error, res) {
    if (error.response) {
        console.error('An error occurred. Response details:\n', {
            request: {
                resource: error.response.request.url,
                method: error.response.request.method,
                payload: error.response.request._data,
            },
            response: {
                status: error.status,
                error: error.message,
                body: error.response.body,
            }
        });
    } else {
        console.error('An error occurred:\n', error);
    }
    res.status(500);
    return res.send();
};

app.post('/order', (req, res) => {
    console.log('POST /order');
    const { make, model, packageLevel, customerId = null } = req.body;

    if (!make || !model || !packageLevel) {
        console.error('Some required parameters are missing.');
        res.status(400);
        return res.send({ message: 'Invalid request.' });
    }

    const data = {
        make,
        model,
        packageLevel,
        customerId,
    };
    
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

    const orderData = Object.assign(data, { supplier });

    let orderId = null;
    db.insertOrder(orderData)
        .then((order) => {
            console.log('Order successfully created in the database.');
            orderId = order._id;
            return supplierRequest(supplier, orderData);
        })
        .then(supplierOrderId => {
            console.log('Order successfully sent to the supplier.');
            return db.addSupplierOrderId(orderId, supplierOrderId);
        })
        .then(() => res.send({ message: 'Order successfully created.' }))
        .catch(error => catchError(error, res));
});

app.get('/orders', (req, res) => {
    console.log('GET /orders');
    db.fetchOrders()
        .then(orders => {
            console.log('Order data successfully retrieved.');
            return res.send({ orders });
        })
        .catch(error => catchError(error, res));
  });

app.listen(port, hostname, () => console.log(`CCAS API listening at ${hostname}:${port}`));
