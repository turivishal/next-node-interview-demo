const { Auth } = require('./auth.model');
const JWT = require('jsonwebtoken');
const config = require('config');
const helper = require('../../util/general.helper');

const msgpath = Auth.ModelName;

// REGISTER
module.exports.register = async (data) => {
    // CHECK userName EXISTS OR NOT
    let hasUser = await Auth.Schema.findOne({ userName: data.userName }, { _id: 1 });
    if (hasUser) {
        return {
            statusCode: 409,
            messageKey: `${msgpath}.username_already_exists`
        };
    }

    // ENCRYPT PASSWRD
    data.password = await helper.cryptPassword(data.password);

    // CREATE A NEW USER
    let authObj = new Auth.Schema(data);
    await authObj.save();
    return {
        statusCode: 200,
        messageKey: `${msgpath}.register_success`
    };
}

// LOGIN
module.exports.login = async (data) => {
    let hasUser = await Auth.Schema.findOne(
        { 
            userName: data.userName,
            status: 1 // Active User
        }, 
        {
            fullName: 1,
            userName: 1,
            password: 1,
            status: 1
        }
    ).lean();
    // NO USER FOUND
    if (!hasUser) {
        return {
            statusCode: 401,
            messageKey: `${msgpath}.invalid_login_auth`
        }; 
    }
    
    // COMPARE PASSWORD HASH
    let isCorrectPassword = helper.comparePasswprd(data.password, hasUser.password);
    if (!isCorrectPassword) {
        return {
            statusCode: 401,
            messageKey: `${msgpath}.invalid_login_auth`
        }; 
    }

    // GENERATE AUTH TOKEN
    let authToken = JWT.sign(
        {
            data: { 
                id: hasUser._id, 
                fullName: hasUser.fullName 
            }
        }, 
        config.get('gateway_auth.secret'), 
        { 
            expiresIn: config.get('gateway_auth.jwt.expiresIn'), 
        }
    );

    return {
        statusCode: 200,
        messageKey: `${msgpath}.login_success_auth`,
        data: { authToken }
    };
}

// MY PROFILE
module.exports.me = (data) => {
    return {
        statusCode: 200,
        messageKey: `${msgpath}.profile`,
        data: data.user.data
    };
}