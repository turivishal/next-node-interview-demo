const { Task } = require('./task.model');
const MongoRepository = require('../../util/mongo.repository.helper');

const msgpath = Task.ModelName;

// CREATE
module.exports.create = async (data) => {
    // GET CREATED BY DETAILS
    data.createdBy = {
        _id: data.user.data.id,
        fullName: data.user.data.fullName
    };
    
    // CREATE A NEW TASK
    let taskObj = new Task.Schema(data);
    let responseData = await taskObj.save();

    // SEND TASK UPDATE TO ALL CONNECTED CLIENTS
    io.sockets.to('taskBoard').emit('taskCreated', responseData);
    
    return {
        statusCode: 200,
        messageKey: `${msgpath}.created`,
        data: {
            id: responseData._id
        }
    };
}

// READ
module.exports.read = async (id) => {
    // FIND TASK
    let responseData = await Task.Schema.findOne({ _id: id, status: 1 }, Task.TaskReadProjection).lean();
    if (!responseData) {
        return {
            statusCode: 404,
            messageKey: `${msgpath}.not_found`
        };
    }
    
    // SUCCESS
    return {
        statusCode: 200,
        messageKey: `${msgpath}.read_a`,
        data: responseData
    };
}

// UPDATE
module.exports.update = async (id, data) => {
    // SET UPDATED DATE IF UPDATED stage
    if (data.stage?.status) {
        data.stage.updatedAt = new Date();
        // SET STAGE UPDATED BY
        data.stage.updatedBy = {
            _id: data.user.data.id,
            fullName: data.user.data.fullName
        };
    }

    // SET UPDATED DATE IF UPDATED assignedTo
    if (data.assignedTo?._id) {
        data.assignedTo.updatedAt = new Date();
    }

    // UPDATE TASK
    let responseData = await Task.Schema.updateOne(
        { _id: id, status: 1 }, 
        { $set: data }
    );
    
    // SUCCESS
    if (responseData.modifiedCount == 1) {
        // SEND TASK UPDATE TO ALL CONNECTED CLIENTS
        io.sockets.to('taskBoard').emit('taskUpdated', { _id: id, ...data });
    
        return {
            statusCode: 200,
            messageKey: `${msgpath}.updated`    
        }
    }
    
    // NOT FOUND
    return {
        statusCode: 404,
        messageKey: `${msgpath}.not_found`
    };
}

// DELETE
module.exports.delete = async (id, data) => {
    // DELETE TASK
    let responseData = await Task.Schema.updateOne(
        { 
            _id: id, 
            status: 1,
            // ALLOWED ONLY IF THE USER IS OWNER/CREATOR OF THIS TASK
            'createdBy._id': data.user.data.id 
        }, 
        { 
            $set: { 
                status: 2 // Delete
            } 
        } 
    );
    
    // SUCCESS
    if (responseData.modifiedCount == 1) {
        // SEND TASK UPDATE TO ALL CONNECTED CLIENTS
        io.sockets.to('taskBoard').emit('taskDeleted', { _id: id });

        return {
            statusCode: 200,
            messageKey: `${msgpath}.deleted`    
        }
    }
    
    // NOT FOUND
    return {
        statusCode: 404,
        messageKey: `${msgpath}.not_found_or_not_owner`
    };
}

// STAGE
module.exports.stage = async (id, data) => {
    // SET UPDATE DATE
    data.stage.updatedAt = new Date();
    // SET STAGE UPDATED BY
    data.stage.updatedBy = {
        _id: data.user.data.id,
        fullName: data.user.data.fullName
    };

    // UPDATE TASK
    let responseData = await Task.Schema.updateOne(
        { 
            _id: id, 
            status: 1,
            $or: [
                // ALLOWED ONLY IF THE USER IS OWNER/CREATOR OF THIS TASK
                { 'createdBy._id': data.user.data.id },
                // ALLOWD ONLY IF THE USER HAS ASSIGNED THIS TASK
                { 'assignedTo._id': data.user.data.id }
            ]
        }, 
        { $set: data }
    );
    
    // SUCCESS
    if (responseData.modifiedCount == 1) {
        // SEND TASK UPDATE TO ALL CONNECTED CLIENTS
        io.sockets.to('taskBoard').emit('taskStageUpdated', { _id: id, ...data });

        return {
            statusCode: 200,
            messageKey: `${msgpath}.updated_stage`    
        }
    }
    
    // NOT FOUND
    return {
        statusCode: 404,
        messageKey: `${msgpath}.not_found_or_not_owner`
    };
}

// ASSIGN
module.exports.assign = async (id, data) => {
    // SET UPDATE DATE
    data.assignedTo.updatedAt = new Date();
    
    // UPDATE TASK
    let responseData = await Task.Schema.updateOne(
        { 
            _id: id, 
            status: 1,
            // ALLOWED ONLY IF THE USER IS OWNER/CREATOR OF THIS TASK
            'createdBy._id': data.user.data.id
        }, 
        { $set: data }
    );
    
    // SUCCESS
    if (responseData.modifiedCount == 1) {
        // SEND TASK UPDATE TO ALL CONNECTED CLIENTS
        io.sockets.to('taskBoard').emit('taskAssigned', { _id: id, ...data });

        return {
            statusCode: 200,
            messageKey: `${msgpath}.updated_assign`    
        }
    }
    
    // NOT FOUND
    return {
        statusCode: 404,
        messageKey: `${msgpath}.not_found_or_not_owner`
    };
}

// SEARCH
module.exports.search = async (data) => {
    // PREPARE PAGINATION
    let { limit, skip } = MongoRepository.customPagination(data);
    
    console.log(limit, skip)

    // SORT BY
    let sort = { createdAt: -1 };

    // DEFAULT MATCH CRITERIA
    let query = { status: 1 }; // Active

    // SEARCH
    if (data.searchKeyword) {
        query['$or'] = MongoRepository.seaKeyCond(data.searchKeyword, Task.TaskSearchProperties);
    }
    
    // FIND QUERY
    let responseData = await Task.Schema
        .find(query, Task.TaskSearchProjection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

    return {
        statusCode: 200,
        messageKey: `${msgpath}.read_all`,
        data: {
            count: responseData.length,
            list: responseData
        }
    };
}
