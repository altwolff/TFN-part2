function errorHandler(err, req, res, next) {
    let status = 500;

    const message = err.message || 'Internal Server Error';

    if (/not found/i.test(message)) status = 404;
    else if (/already exists/i.test(message)) status = 409;
    else if (/validation|invalid/i.test(message)) status = 400;

    res.status(status).json({
        error: message,
        timestamp: new Date().toISOString()
    });
}

module.exports = errorHandler;