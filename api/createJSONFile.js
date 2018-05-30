const fs = require('fs');

module.exports = function (path, orderData) {
    console.log('Creating static JSON file.');
    return Promise.resolve(fs.writeFile(`${path}.json`, JSON.stringify(orderData, null, '\t')))
        .catch(error => {
            console.log(error);
            return null;
        });
};
