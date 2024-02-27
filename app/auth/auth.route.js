const controller = require('./auth.controller');
const { Auth } = require('./auth.model');
const Validate = require('../../middleware/validation.middleware');
const auth = require('../../middleware/auth.middleware');

module.exports = (router) => {

    const Model = Auth;
    const route = Auth.RouteName;

    router.post(`/${route}/register`, Validate.request(Model, 'register'), controller.register);
    router.post(`/${route}/login`, Validate.request(Model, 'login'), controller.login);
    router.get(`/${route}/me`, auth, controller.me);
    
}