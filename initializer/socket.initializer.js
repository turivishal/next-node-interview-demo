module.exports = async (server, config) => {

    global.io = require('socket.io')(server, {
        path: config.get('socket.path')
    });
    // INIT
    require('../app/socket/socket')(io);

}