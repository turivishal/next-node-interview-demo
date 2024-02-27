const TaskService = require('./task.service');

/**
 * @swagger
 * /task:
 *   post:
 *     security:
 *       - Authorization: []
 *     description: Create a Task
 *     summary: Create a Task
 *     operationId: TaskCreate
 *     tags:
 *       - Task
 *     requestBody:
 *       description: Task Details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

module.exports.create = async (req, res) => {
    try {
        Response.send(res, await TaskService.create(req.body));
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
 * /task/{taskId}:
 *   get:
 *     security:
 *       - Authorization: [] 
 *     description: Get a Task
 *     summary: Get a Task
 *     operationId: TaskRead
 *     tags:
 *       - Task
 *     parameters:
 *       - name: taskId
 *         description: Task unique ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *          $ref: '#/components/schemas/Task'
 */

// READ
module.exports.read = async (req, res) => {
    try {
        Response.send(res, await TaskService.read(req.params.id));
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
 * /task/{taskId}:
 *   put:
 *     security:
 *       - Authorization: []
 *     description: Edit a Task
 *     summary: Edit a Task
 *     operationId: TaskEdit
 *     tags:
 *       - Task
 *     parameters:
 *       - name: taskId
 *         description: Task unique ID
 *         in: path
 *         required: true
 *     requestBody:
 *       description: Task details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// UPDATE
module.exports.update = async (req, res) => {
    try {
        Response.send(res, await TaskService.update(req.params.id, req.body));
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
 * /task/{taskId}:
 *   delete:
 *     security:
 *       - Authorization: [] 
 *     description: Delete a Task
 *     summary: Delete a Task 
 *     operationId: TaskDelete
 *     tags:
 *       - Task
 *     parameters:
 *       - name: taskId
 *         description: Task unique ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *          $ref: '#/components/schemas/Task'
 */

// DELETE
module.exports.delete = async (req, res) => {
    try {
        Response.send(res, await TaskService.delete(req.params.id, req.body));
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
 * /task/{taskId}/stage:
 *   put:
 *     security:
 *       - Authorization: []
 *     description: Edit Task's Stage
 *     summary: Edit Task's Stage
 *     operationId: TaskStage
 *     tags:
 *       - Task
 *     parameters:
 *       - name: taskId
 *         description: Task unique ID
 *         in: path
 *         required: true
 *     requestBody:
 *       description: Task Stage details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskStageStatus'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// STAGE UPDATE
module.exports.stage = async (req, res) => {
    try {
        Response.send(res, await TaskService.stage(req.params.id, req.body));
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
 * /task/{taskId}/assign:
 *   put:
 *     security:
 *       - Authorization: []
 *     description: Assign Task
 *     summary: Assign Task
 *     operationId: TaskAssign
 *     tags:
 *       - Task
 *     parameters:
 *       - name: taskId
 *         description: Task unique ID
 *         in: path
 *         required: true
 *     requestBody:
 *       description: Assign Task details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskAssign'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// ASSIGN
module.exports.assign = async (req, res) => {
    try {
        Response.send(res, await TaskService.assign(req.params.id, req.body));
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
 * /task/search:
 *   get:
 *     security:
 *       - Authorization: []
 *     description: Search Task
 *     summary: Search Task
 *     operationId: TaskSearch
 *     tags:
 *       - Task
 *     parameters:
 *       - name: perPage
 *         description: "Limit, default is 10"
 *         in: query
 *         required: true
 *       - name: page
 *         description: "Page number, starting from 1, default is 1"
 *         in: query
 *         required: true
 *       - name: searchKeyword
 *         description: "Search Keywords, from Title and Description"
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// SEARCH
module.exports.search = async (req, res) => {
    try {
        Response.send(res, await TaskService.search(req.query));
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