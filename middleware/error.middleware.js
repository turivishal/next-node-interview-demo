const winston = require('winston').loggers.get('general');

module.exports = (error, req, res, next) => {
    // LOG ERROR
    winston.error(error.message);
    return Response.send(res, {
        statusCode: 500,
        messageKey: 'general.something_wrong',
        data: {
            description: error.message
        }
    });
}