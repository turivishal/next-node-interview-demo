const controller = require('./task.controller');
const { Task } = require('./task.model');
const Validate = require('../../middleware/validation.middleware');
const auth = require('../../middleware/auth.middleware');

module.exports = (router) => {

    const Model = Task;
    const route = Task.RouteName;

    // CREATE
    router.post(`/${route}`, auth, Validate.request(Model, 'create'), controller.create);

    // SEARCH
    router.get(`/${route}/search`, auth, Validate.requestQ(Model, 'search'), controller.search);
    
    // READ
    router.get(`/${route}/:id`, auth, Validate.validateObjectId(['id']), controller.read);

    // UPDATE
    router.put(`/${route}/:id`, auth, Validate.validateObjectId(['id']), Validate.request(Model, 'update'), controller.update);

    // DELETE
    router.delete(`/${route}/:id`, auth, Validate.validateObjectId(['id']), controller.delete);

    // STAGE
    router.put(`/${route}/:id/stage`, auth, Validate.validateObjectId(['id']), Validate.request(Model, 'stage'), controller.stage);

    // ASSIGN
    router.put(`/${route}/:id/assign`, auth, Validate.validateObjectId(['id']), Validate.request(Model, 'assign'), controller.assign);

}