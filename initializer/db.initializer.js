const mongoose = require('mongoose');
const winston = require('winston').loggers.get('general');

module.exports = (app, config) => {

    const mongodb = config.get('mongodb');

    mongoose.set('strictQuery', true);
    mongoose.connect(mongodb.uris, mongodb.options)
        .then()
        .catch(err => {
            winston.error('MDB connection failed, ' + err);
        });

    mongoose.connection.on('connected', () => {
        winston.info('MDB connection succeeded!');
    });

    mongoose.connection.on('error', (err) => {
        mongoose.disconnect();
    });

    mongoose.connection.on('disconnected', () => {
        winston.info('MDB connection disconnected!');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close().then(() => {
            winston.info('Mongoose connection disconnected through app termination!');
            process.exit(0);
        });
    });

}