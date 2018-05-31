const log = require('./log', 'error');

module.exports = function (error, res) {
    if (error.response) {
        log({
            message: 'An error occurred. Response details:\n',
            error: {
                request: {
                    resource: error.response.request.url,
                    method: error.response.request.method,
                    payload: error.response.request._data,
                },
                response: {
                    status: error.status,
                    error: error.message,
                    body: error.response.body,
                },
            }
        }, 'error');
    } else {
        log({ message: 'An error occurred', error }, 'error');
    }
    res.status(500);
    return res.send();
};
