const fs = require('fs');
const log = require('./log');

module.exports = function (path, orderData) {
    log('Creating static JSON file.');
    return Promise.resolve(fs.writeFile(`${path}.json`, JSON.stringify(orderData, null, '\t'), error => {
            if (error) log(error);
            return null;
        }));
};
