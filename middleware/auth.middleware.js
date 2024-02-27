const JWT = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // GET TOKEN
    let token = req.header(config.get('gateway_auth.auth_token_key'));
    if (!token) return Response.send(res, {
        statusCode: 401,
        messageKey: 'auth.no_auth'
    });

    // VALIDATE TOKEN SIGNATURE
    try {
        token = token.replace('Bearer ', '');
        // SET USER DATA IN user FIELD IN body
        req.body.user = JWT.verify(token, config.get('gateway_auth.secret'));
        next();
    }
    catch (error) {
        return Response.send(res, {
            statusCode: 401,
            messageKey: 'auth.no_auth',
            data: {
                description: error.message
            }
        });
    }
}