const config = require('config');

module.exports = (req, res, next) => {
    if(
        config.get('swagger.users').includes(req.params.id) 
        && config.get('swagger.auth_key') === req.params.password 
    ) {
        next();
    }
    else {
        Response.send(res, {
            statusCode: 403,
            messageKey: 'auth.no_auth',
        });
    }
}