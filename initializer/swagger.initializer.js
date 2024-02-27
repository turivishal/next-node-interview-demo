const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('config');

module.exports = async (app) => {

    let jsDoc = swaggerJSDoc({
        swaggerDefinition: {
            ...require('../swagger.json')
        },
        apis: ['./app/**/*.js']
    });

    // SET EXPLORER RESPONSE JSON
    app.get('/api-docs.json/:id/:password', require('../middleware/swagger-auth.middleware'), function (req, res) {
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');      
        res.send(jsDoc);
    });

    // SHOW SWAGGER OR NOT, SHOULD OFF IN PRODUCTION
    if (config.get('swagger.enable')) {
        // SET SWAGGER DOCS
        router.use('/', swaggerUi.serve, swaggerUi.setup(
            jsDoc,
            {
                explorer: false,
                // https://github.com/swagger-api/validator-badge
                validatorUrl: null,
                swaggerOptions: {
                    displayRequestDuration: true,
                    docExpansion: 'list',
                    filter: false,
                    showExtensions: true,
                    showCommonExtensions: true,
                    displayOperationId: true
                }
            }
        ));
        app.use('/api-docs/:id/:password', require('../middleware/swagger-auth.middleware'), router);
    }
    
}
