const cors = require('cors');
const routes = require('config').get('routes');

// ENDS WITH ORIGIN CHECK
function endsWith(origin, origins) {
    const url = new URL(origin);  
    return origins.map((o) => url.host.endsWith(o)).includes(true);
}

module.exports = (req, res, next) => {
    if (routes.cors_root.check) {
        if (req.header('referer') && endsWith(req.header('referer'), routes.cors_root.origin)) {
            return cors(Object.assign({}, routes.cors_root.options, { origin: req.header('origin') }))(req, res, next);
        }
        
        return Response.send(res, {
            statusCode: 403,
            messageKey: 'auth.invalid_token_auth'
        });
    }
    else {
        return cors(routes.cors)(req, res, next);
    }
}