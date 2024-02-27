const Joi = require('joi');

// JOI SCHEMA VALIDATIONS
module.exports.validations = (Payload) => {
    return {
        fullName: Joi.string().min(5).max(30).trim().required(),
        userName: Joi.string().min(5).max(30).trim().required(),
        password: Joi.string().min(3).max(30).trim().required(),
        status: Joi.number().valid(...Payload.ActiveStatus)
    };
}