module.exports = [
    // TASK BOARD
    require('./taskBoard/taskBoard.route'),
    // TASKS
    require('./task/task.route'),
    
    // PUT AT THE END
    // AUTH
    require('./auth/auth.route'),
    // PAGE NOT FOUND!
    require('./noRoute/noRoute.route')
];
