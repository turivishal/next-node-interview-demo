const mongoose = require('mongoose');
const _ = require('lodash');

// METADATA
const Model = 'Task';
const ModelName = 'task';
const RouteName = 'task';

// LOAD VALIDATIONS
const Joi = require(`./${ModelName}.validate`);

// PARAMETERS
/**
 * @swagger
 * components:
 *   parameters:
 *     TaskActiveStatus:
 *       name: status
 *       description: 'Active Status: \n* 0 = inactive \n* 1 = active \n* 2 = delete'
 *       schema:
 *         type: number
 *         enum: [0,1,2]
 *         default: 1
 *       example: 1
 *       in: query
 *     TaskStageStatus:
 *       name: status
 *       description: 'Task Stage: \n* 1 = pending \n* 2 = active \n* 3 = completed \n* 4 = hold'
 *       schema:
 *         type: number
 *         enum: [1,2,3,4]
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

// TASK STAGE
const StageStatus = [
    1, // Pending
    2, // Active
    3, // Completed
    4 // Hold
];

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskStageUpdatedBy:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: ''
 *           description: "User's ID"
 *         fullName: 
 *           type: string
 *           example: ''
 *           description: "User's Name"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskStage:
 *       type: object
 *       properties:
 *         status: 
 *           $ref: '#/components/parameters/TaskStageStatus'
 *         updatedAt: 
 *           type: string
 *           example: ''
 *           description: "Updated Date"
 *         updatedBy: 
 *           $ref: '#/components/schemas/TaskStageUpdatedBy'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskCreatedBy:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: ''
 *           description: "User's ID"
 *         fullName: 
 *           type: string
 *           example: ''
 *           description: "User's Name"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskAssignedTo:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: ''
 *           description: "User's ID"
 *           required: true
 *         fullName: 
 *           type: string
 *           example: ''
 *           description: "User's Name"
 *           required: true
 *         updatedAt: 
 *           type: string
 *           example: ''
 *           description: "Assigned Date"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title: 
 *           type: string
 *           example: ''
 *           description: "Task Title"
 *           required: true
 *         description: 
 *           type: string
 *           example: ''
 *           description: "Task Description"
 *           required: true
 *         stage: 
 *           $ref: '#/components/schemas/TaskStage'
 *         assignedTo:
 *           $ref: '#/components/schemas/TaskAssignedTo'
 *         createdBy:
 *           $ref: '#/components/schemas/TaskCreatedBy' 
 *         status:
 *           $ref: '#/components/parameters/TaskActiveStatus'
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

// SCHEMA
const TaskSchema = {
    title: String,
    description: String,
    stage: {
        status: {
            type: Number,
            enum: StageStatus,
            default: 1 // Pending
        },
        updatedBy: {
            _id: mongoose.Schema.ObjectId,
            fullName: String
        },
        updatedAt: {
            type: Date,
            default: Date
        }
    },
    assignedTo: {
        _id: mongoose.Schema.ObjectId,
        fullName: String,
        updatedAt: {
            type: Date,
            default: Date
        }
    },
    createdBy: {
        _id: mongoose.Schema.ObjectId,
        fullName: String
    },
    status: {
        type: Number,
        enum: ActiveStatus,
        default: 1 // Active
    }
};

// SCHEMA
const SchemaObj = new mongoose.Schema(
    TaskSchema,
    {
        collection: `${ModelName}`,
        timestamps: true,
        versionKey: false
    }
);
const Schema = mongoose.model(Model, SchemaObj);

// PRE SAVE HOOK
// Schema.pre('save', (next) => {
//     // SET LATEST DATE IN STAGE DATE
//     if (this.assignedTo?._id) {
//         this.assignedTo.updatedAt = new Date()
//     }
//     // 
//     next();
// });
   

// LOAD JOI VALIDATIONS
const JoiValidations = Joi.validations({
    ActiveStatus,
    StageStatus
});
let DtoValidations = {};

// ============================================ CREATE

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskCreate:
 *       type: object
 *       properties:
 *         title:
 *           $ref: '#/components/schemas/Task/properties/title'
 *         description:
 *           $ref: '#/components/schemas/Task/properties/description'
 *         stage: 
 *           type: object
 *           properties:
 *             status:
 *               $ref: '#/components/schemas/TaskStage/properties/status'
 *         assignedTo: 
 *           type: object
 *           properties:
 *             _id:
 *               $ref: '#/components/schemas/TaskAssignedTo/properties/_id'
 *             fullName:
 *               $ref: '#/components/schemas/TaskAssignedTo/properties/fullName'
 */

const TaskCreateDTO = [
    'title',
    'description',
    'stage',
    'assignedTo'
];

// VALIDATIONS
DtoValidations.create = _.pick(JoiValidations, TaskCreateDTO);

// ============================================ READ

const TaskReadProjection = {
    title: 1,
    description: 1,
    stage: 1,
    assignedTo: 1,
    createdBy: 1,
    createdAt: 1,
    updatedAt: 1
};

// ============================================ UPDATE

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskUpdate:
 *       type: object
 *       properties:
 *         title:
 *           $ref: '#/components/schemas/Task/properties/title'
 *         description:
 *           $ref: '#/components/schemas/Task/properties/description'
 *         stage: 
 *           type: object
 *           properties:
 *             status:
 *               $ref: '#/components/schemas/TaskStage/properties/status'
 *         assignedTo: 
 *           type: object
 *           properties:
 *             _id:
 *               $ref: '#/components/schemas/TaskAssignedTo/properties/_id'
 *             fullName:
 *               $ref: '#/components/schemas/TaskAssignedTo/properties/fullName'
 */

const TaskUpdateDTO = [
    'title',
    'description',
    'stage',
    'assignedTo'
];

// VALIDATIONS
DtoValidations.update = _.pick(JoiValidations, TaskUpdateDTO);

// ============================================ STAGE

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskStageStatus:
 *       type: object
 *       properties:
 *         stage: 
 *           type: object
 *           properties:
 *             status:
 *               $ref: '#/components/schemas/TaskStage/properties/status'
 */

const TaskStageDTO = [
    'stage'
];

// VALIDATIONS
DtoValidations.stage = _.pick(JoiValidations, TaskStageDTO);

// ============================================ ASSIGN

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskAssign:
 *       type: object
 *       properties:
 *         assignedTo: 
 *           type: object
 *           properties:
 *             _id:
 *               $ref: '#/components/schemas/TaskAssignedTo/properties/_id'
 *             fullName:
 *               $ref: '#/components/schemas/TaskAssignedTo/properties/fullName'
 */

const TaskAssignDTO = [
    'assignedTo'
];

// VALIDATIONS
DtoValidations.assign = _.pick(JoiValidations, TaskAssignDTO);

// ============================================ SEARCH

// SEARCHING PROPERTIES
const TaskSearchProperties = [
    "title",
    "description"
];

// ALL DTO
const TaskSearchDTO = [
    "searchKeyword",
    "perPage",
    "page"
];

// VISIBLE VALIDATIONS
DtoValidations.search = _.pick(JoiValidations, TaskSearchDTO);

const TaskSearchProjection = {
    title: 1,
    description: 1,
    stage: 1,
    assignedTo: 1,
    createdBy: 1,
    createdAt: 1,
    updatedAt: 1
};

// EXPORTS
exports[Model] = {
    Schema,
    DtoValidations,
    Model,
    ModelName,
    RouteName,
    TaskCreateDTO,
    TaskReadProjection,
    TaskUpdateDTO,
    TaskStageDTO,
    TaskAssignDTO,
    TaskSearchProperties,
    TaskSearchDTO,
    TaskSearchProjection
};