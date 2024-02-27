const controller = require('./taskBoard.controller');

module.exports = (router) => {

    const route = 'taskBoard';

    // TASK BOARD
    router.get(`/${route}`, controller.taskBoard);
    
}