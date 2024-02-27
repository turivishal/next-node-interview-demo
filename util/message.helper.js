const yaml = require('./yaml.helper');
const Translations = yaml.getAllMessageLib('./language/');

class MessageReader {

    responsePath;

    constructor() {
        // SET RESPONSE FILE PATH 
        this.responsePath = 'response-message.yaml';
    }

    // GET MESSAGE
    getParsedMessage(messageKey) {
        return Translations[this.responsePath][messageKey];
    }

    // HOPI/JOI ERROR ARRAY DECODE
    joiErrorDecode = async (error) => {
        if (error) {
            let result = {};
            for (let field in error.details) result[error.details[field].path[0]] = error.details[field].message;
            return result;
        }
    }

}

module.exports = {
    'MessageReader': new MessageReader()
};