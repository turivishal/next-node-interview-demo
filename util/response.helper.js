const { MessageReader } = require('./message.helper');

class Response {

    defaultStatusCode;
    defaultMessageKey;
    defaultHeaders;

    constructor() {
        // SET DEFAULT STATUS
        this.defaultStatusCode = 400;
        // SET DEFAULT MESSAGE
        this.defaultMessageKey = 'general.no_message';
        // SET DEFAULT HEADERS
        // Access-Control-Expose-Headers: <header-name>, <header-name>, ...
        // Access-Control-Expose-Headers: *
        this.defaultHeaders = {};
    }

    // SENT SUCCESS RESPONSE
    send(res, options = {}) {
        // SET STATUS CODE
        this.setStatusCode(res, options.statusCode);
        // SET HEADERS
        this.setHeaders(res, options.headers);
        // SET RESPONSE JSON
        this.setJSONResponse(res, options);
    }

    // SENT SUCCESS NO BODY RESPONSE
    sendNoBody(res, options = {}) {
        // SET STATUS CODE
        this.setStatusCode(res, options.statusCode);
        // SET HEADERS
        this.setHeaders(res, options.headers);
        // SET RESPONSE
        res.send();
    }

    // SET RESPONSE STATUS CODE
    setStatusCode(res, statusCode=this.defaultStatusCode) {
        res.status(statusCode);
    }

    // SET RESPONSE HEADERS
    setHeaders(res, headers={}) {
        res.header({ ...headers, ...this.defaultHeaders });
    }

    // SEND JSON RESPONSE
    setJSONResponse(res, options) {
        let message = MessageReader.getParsedMessage(options.messageKey || this.defaultMessageKey);
        res.json({ message, data: options.data });
    }

}

module.exports = new Response();