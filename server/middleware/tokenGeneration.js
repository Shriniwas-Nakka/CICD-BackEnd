/***********************************************
 * @Purpose - FundooNotes (Token Generation)
 * @file    - tokenGeneration.js
 * @author  - Shriniwas Nakka
 * @since   - 23/07/2019
 ***********************************************/

const jwt = require('jsonwebtoken');

/**
 * @description : token generation for registration api
 */
module.exports.registerTokenGenerate = function (payload) {
    try {
        /**
         * @description : signs the given payload into JSON web token payload 
         */
        const token = jwt.sign(payload, process.env.registerSecretKey, { expiresIn: '1d' });
        /**
         * @description : returns message with token after successfully generating token 
         */
        var msg = {
            success: true,
            mesasge: "Token generated successfully",
            token: token
        }
        return msg;
    } catch (err) {
        console.log('Failed to generate tokens.');
    }
}

/**
 * @description : token generation for login api
 */
module.exports.loginTokenGenerate = function (payload) {
    try {
        /**
         * @description : signs the given payload into JSON web token payload 
         */
        const token = jwt.sign(payload, process.env.loginSecretKey, { expiresIn: '1d' });
        /**
         * @description : returns message with token after successfully generating token 
         */
        var msg = {
            success: true,
            mesasge: "Token generated successfully",
            token: token
        }
        return msg;
    } catch (err) {
        console.log('Failed to generate tokens.');
    }
}

/**
 * @description : token generation for forgot api
 */
module.exports.forgotTokenGenerate = function (payload) {
    try {
        /**
         * @description : signs the given payload into JSON web token payload 
         */
        const token = jwt.sign(payload, process.env.forgotSecretKey, { expiresIn: '1d' });
        /**
         * @description : returns message with token after successfully generating token 
         */
        var msg = {
            success: true,
            mesasge: "Token generated successfully",
            token: token
        }
        return msg;
    } catch (err) {
        console.log('Failed to generate tokens.');
    }
}