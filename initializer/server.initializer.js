const winston = require('winston').loggers.get('general');

module.exports = async (app, config) => {

    const port = config.get('server.port');
    const server = await app.listen(port, () => {
        winston.info(`We are working on ${config.get('mode').toUpperCase()} environment and Listening on port ${port}...`)
    })
    .on('error', (err) => {
        winston.error(err.message);
    });
    
    // INITIALIZE SOCLKET
    require('./socket.initializer')(server, config);
    
}