const Joi = require('joi');

// JOI SCHEMA VALIDATIONS
module.exports.validations = (Payload) => {
    return {
        title: Joi.string().min(10).max(255).trim().required(),
        description: Joi.string().min(10).max(1000).trim().required(),
        stage: Joi.object().keys({
            status: Joi.number().valid(...Payload.StageStatus).required()
        }),
        assignedTo: Joi.object().keys({
            _id: Joi.objectId().required(),
            fullName: Joi.string().min(5).max(30).trim().required()
        }).required(),
        status: Joi.number().valid(...Payload.ActiveStatus),

        searchKeyword: Joi.string().max(50).allow(''),
        perPage: Joi.number().min(1).max(500),
        page: Joi.number().min(1)
    };
}