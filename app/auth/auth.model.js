const mongoose = require('mongoose');
const _ = require('lodash');

// METADATA
const Model = 'Auth';
const ModelName = 'auth';
const RouteName = 'auth';

// LOAD VALIDATIONS
const Joi = require(`./${ModelName}.validate`);

// PARAMETERS
/**
 * @swagger
 * components:
 *   parameters:
 *     AuthActiveStatus:
 *       name: status
 *       description: 'Active Status: \n* 0 = inactive \n* 1 = active \n* 2 = delete'
 *       schema:
 *         type: number
 *         enum: [0,1,2]
 *         default: 1
 *       example: 1
 *       in: query
 */

// ACTIVE STATUS
const ActiveStatus = [
    0, // Inactive
    1, // Active
    2 // Delete
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         fullName: 
 *           type: string
 *           example: ''
 *           description: "User's Full Name"
 *         userName: 
 *           type: string
 *           example: ''
 *           description: "User's Login ID"
 *         password: 
 *           type: string
 *           example: ''
 *           description: "User's Login Password"
 *         status:
 *           $ref: '#/components/parameters/AuthActiveStatus'
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

// SCHEMA
const AuthSchema = {
    fullName: String,
    userName: String,
    password: String,
    status: {
        type: Number,
        enum: ActiveStatus,
        default: 1 // Active
    }
};

// SCHEMA
const SchemaObj = new mongoose.Schema(
    AuthSchema,
    {
        collection: `${ModelName}`,
        timestamps: true,
        versionKey: false
    }
);
const Schema = mongoose.model(Model, SchemaObj);

// LOAD JOI VALIDATIONS
const JoiValidations = Joi.validations({
    ActiveStatus
});
let DtoValidations = {};

// ============================================ REGISTER

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegister:
 *       type: object
 *       properties:
 *         fullName:
 *           $ref: '#/components/schemas/Auth/properties/fullName'
 *         userName:
 *           $ref: '#/components/schemas/Auth/properties/userName'
 *         password: 
 *           $ref: '#/components/schemas/Auth/properties/password'
 */

const AuthRegisterDTO = [
    'fullName',
    'userName',
    'password'
];

// CREATE VALIDATIONS
DtoValidations.register = _.pick(JoiValidations, AuthRegisterDTO);

// ============================================ LOGIN

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLogin:
 *       type: object
 *       properties:
 *         userName:
 *           $ref: '#/components/schemas/Auth/properties/userName'
 *         password: 
 *           $ref: '#/components/schemas/Auth/properties/password'
 */

const AuthLoginDTO = [
    'userName',
    'password'
];

// CREATE VALIDATIONS
DtoValidations.login = _.pick(JoiValidations, AuthLoginDTO);

// EXPORTS
exports[Model] = {
    Schema,
    DtoValidations,
    Model,
    ModelName,
    RouteName,
    AuthLoginDTO,
    AuthRegisterDTO
};