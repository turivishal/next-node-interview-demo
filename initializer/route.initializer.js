const express = require('express');
const router = express.Router();
const error = require('../middleware/error.middleware');
const cors = require('../middleware/cors.middleware');
const compression = require('compression');
const helmet = require('helmet');

module.exports = async (app, config) => {

    const routes = config.get('routes');

    // ENABLE CORS
    app.use(cors);
    
    // REQUEST BODY PARAMTERS WAYS / PREPROCESSOR
    app.use(express.json(routes.request.raw.options));
    app.use(express.urlencoded(routes.request.form_urlencoded.urlencoded_options));
    // VIEW ENGINE FOR RUN HTML - TASK BOARD
    app.use(express.static(Requirelib.resolve('public')));
    app.set('views', Requirelib.resolve('public'));
    app.engine('html', require('ejs').renderFile);
    
    // SECURITY
    app.disable('x-powered-by');
    app.use(compression({ threshold: 0 }));
    app.use(helmet());

    // SET ROUTE
    app.use('/api', router);
    
    // LOAD APP ROUTES
    require('../util/general.helper').bootstrap('../app/app.route', [router]);
    
    // ERROR
    app.use(error);

}