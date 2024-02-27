const AuthService = require('./auth.service');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     security:
 *       - Authorization: []
 *     description: Register a User
 *     summary: Register a User
 *     operationId: AuthRegister
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Registeration Details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

module.exports.register = async (req, res) => {
    try {
        Response.send(res, await AuthService.register(req.body));
    } catch (error) {
        Response.send(res, {
            statusCode: 400,
            messageKey: 'general.something_wrong',
            data: {
                description: error.message
            }
        });
    }
}

/**
 * @swagger
 * /auth/login:
 *   post:
 *     security:
 *       - Authorization: []
 *     description: Login User
 *     summary: Login User
 *     operationId: AuthLogin
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Login Details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// LOGIN
module.exports.login = async (req, res) => {
    try {
        Response.send(res, await AuthService.login(req.body));
    } catch (error) {
        Response.send(res, {
            statusCode: 400,
            messageKey: 'general.something_wrong',
            data: {
                description: error.message
            }
        });
    }
}

/**
 * @swagger
 * /auth/me:
 *   get:
 *     security:
 *       - Authorization: []
 *     description: My Profile
 *     summary: My Profile
 *     operationId: AuthProfile
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// MY PROFILE
module.exports.me = async (req, res) => {
    try {
        Response.send(res, await AuthService.me(req.body));
    } catch (error) {
        Response.send(res, {
            statusCode: 400,
            messageKey: 'general.something_wrong',
            data: {
                description: error.message
            }
        });
    }
}