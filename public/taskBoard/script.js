(function(){

    /**
    * ============================= INITIALIZE =============================
    */

    // INITIALIZE
    const host = 'http://localhost:3015',
        socketPath = '/tms',
        authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjVkY2FlZDFiZWRlM2U1YTI1OWI0MzkyIiwiZnVsbE5hbWUiOiJWaXNoYWwgVHVyaSJ9LCJpYXQiOjE3MDg5NzI3MDAsImV4cCI6MTcwOTA1OTEwMH0.SsyFVaa-rzQ0RR5K-DLjriX8Vyggah4ZBx4QdzlJr24';
      
    /**
    * ============================= METHODS =============================
    */

    // CONNECT SOCKET
    function connectSocket() {
        // SOCKET CONFIG
        const socket = io(host, {
            path: socketPath,
            query: { authToken },
            transports: ['websocket'],
            allowUpgrades: false,
            reconnect: false,
            secure: true,
            rejectUnauthorized: false
        });
        // SOCKET ON
        socket.once('connect', () => {
            // CONNECTED
            document.getElementById('cStatus').innerHTML = 'connected';
            
            // LISTENERS
            // TASK CREATED
            socket.on('taskCreated', (response) => {
                console.log(response);
                document.getElementById('taskActions').innerHTML += `
                    <div class='boardActions'>
                        <b>Task Created:</b> ${JSON.stringify(response)}
                    </div>
                `;
            });
            // TASK UPDATED
            socket.on('taskUpdated', (response) => {
                console.log(response);
                document.getElementById('taskActions').innerHTML += `
                    <div class='boardActions'>
                        <b>Task Updated:</b> ${JSON.stringify(response)}
                    </div>
                `;
            });
            // TASK DELETED
            socket.on('taskDeleted', (response) => {
                console.log(response);
                document.getElementById('taskActions').innerHTML += `
                    <div class='boardActions'>
                        <b>Task Deleted:</b> ${JSON.stringify(response)}
                    </div>
                `;
            });
            // TASK STAGE UPDATED
            socket.on('taskStageUpdated', (response) => {
                console.log(response);
                document.getElementById('taskActions').innerHTML += `
                    <div class='boardActions'>
                        <b>Task Stage Updated:</b> ${JSON.stringify(response)}
                    </div>
                `;
            });
            // TASK ASSIGNED
            socket.on('taskAssigned', (response) => {
                console.log(response);
                document.getElementById('taskActions').innerHTML += `
                    <div class='boardActions'>
                        <b>Task ASSIGNED:</b> ${JSON.stringify(response)}
                    </div>
                `;
            });

            // ==== SUPPORTIVES 
        
            socket.on('connect_error', (err) => {
                document.getElementById('cStatus').innerHTML = 'Connect Error - ' + err.message;
                console.log(err.message);
            });
            socket.on('connect_timeout', () => {
                document.getElementById('cStatus').innerHTML = 'Conection Time Out Please Try Again.';
            });
            socket.on('reconnect', (num) => {
                document.getElementById('cStatus').innerHTML = 'Reconnected - ' + num;
            });
            socket.on('reconnect_attempt', () => {
                document.getElementById('cStatus').innerHTML = 'Reconnect Attempted.';
            });
            socket.on('reconnecting', (num) => {
                document.getElementById('cStatus').innerHTML = 'Reconnecting - ' + num;
            });
            socket.on('reconnect_error', (err) => {
                document.getElementById('cStatus').innerHTML = 'Reconnect Error - ' + err.message;
            });
            socket.on('reconnect_failed', () => {
                document.getElementById('cStatus').innerHTML = 'Reconnect Failed';
            });
        });
    }

    /**
    * ============================= LOAD =============================
    */

    window.addEventListener('load', (event) => {
        document.getElementById('host').innerHTML = host;
        document.getElementById('authToken').innerHTML = authToken;

        // CONNECT SOCKET
        connectSocket();
        
        event.preventDefault();
    }); 

}());