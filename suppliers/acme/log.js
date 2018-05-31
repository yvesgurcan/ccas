require('dotenv').load();

const { NODE_ENV } = process.env;

module.exports = function (message, logType) {
    if (NODE_ENV !== 'test') {
        return null;
    }
    return console[logType || 'log'](message);
};
