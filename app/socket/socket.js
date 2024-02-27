const winston = require("winston").loggers.get('general');
const JWT = require('jsonwebtoken');
const config = require("config");

module.exports = async () => {

    io.on('connection', async (socket) => {

        // INITIALIZE
        init();

        // ==== SUPPORTIVES 

        socket.on('disconnect', async (reason) => {
            await deInit(reason);
        });
        socket.on('error', (error) => {
            winston.error("error", socket.id, error);
        });

        // INITIALIZE
        async function init() {
            let token = socket.handshake.query.authToken;
            // GET TOKEN
            if (!token) {
                // DISCONNECT SOCKET
                socket.disconnect();
            }

            // VALIDATE TOKEN SIGNATURE
            try {
                token = token.replace('Bearer ', '');
                // SET USER DATA IN user FIELD IN body
                let userData = JWT.verify(token, config.get('gateway_auth.secret'));
                socket.user = userData.data;
                // JOIN ME IN TASK BOARD
                socket.join('taskBoard');
            }
            catch (error) {
                // DISCONNECT SOCKET
                socket.disconnect();
            }
        }

        // DEINITIALIZE
        function deInit(reason) {
            // LEAVE ME FROM taskBoard GROUP
            socket.leave('taskBoard');

            // DISCONNECT SOCKET
            socket.disconnect();
        }

    });

}