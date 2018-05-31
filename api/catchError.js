module.exports = function (error, res) {
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
