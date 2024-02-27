exports.blocker = (req, res, next) => {
    // BLOCKS 'Palo Alto' | 'InternetMeasurement' | 'CensysInspect' | 'fasthttp' SPAM CALLS
    if (req.headers['user-agent'] && req.headers['user-agent'].search('Palo Alto|InternetMeasurement|CensysInspect|fasthttp') > -1) {
        return Response.sendNoBody(res, {
            statusCode: 400
        });
    }
    else next();
}