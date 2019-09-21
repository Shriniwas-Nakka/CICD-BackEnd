/***********************************************
 * @Purpose -FundooNotes (Services)
 * @file    - user.services.js
 * @author  - Shriniwas Nakka
 * @since   - 23/07/2019
 ***********************************************/

var usermodel = require('../models/user.model');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

/************ User Register Services **************/
/**
 * @description  :  user register services
 * @param {* request from frontend} regitserdata
 * @param {* response to backend } callback
 */
exports.registerService = (regitserdata, callback) => {
    try {
        console.log(regitserdata);
        usermodel.registration(regitserdata, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
        return callback(err);
    }
}

/************ User Login Services **************/
/**
 * @description  :  user login services
 * @param {* request from frontend} loginData
 * @param {* response to backend } callback
 */
exports.loginService = (loginData, callback) => {
    try {
        usermodel.login(loginData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
        return callback(err);
    }
}

/************ Forgot Password Services **************/
/**
 * @description  :  forgot password services
 * @param {* request from frontend} forgotData
 * @param {* response to backend } callback
 */
exports.forgotService = (forgotData, callback) => {
    try {
        usermodel.forgot(forgotData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        return callback(err);
    }
}

/************ Reset Password Services **************/
/**
 * @description  :  reset password services
 * @param {* request from frontend} resetData
 * @param {* response to backend } callback
 */
exports.resetService = (resetData, callback) => {
    try {
        usermodel.reset(resetData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        return callback(err);
    }
}

/************ Email Verification Services **************/
/**
 * @description  :  email verification services
 * @param {* request from frontend} verifyData
 * @param {* response to backend } callback
 */
exports.verifyService = (verifyData, callback) => {
    try {
        usermodel.verification(verifyData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
        return callback(err);
    }
}

/************ Image Upload Services **************/
/**
 * @description  :  image upload services
 * @param {* request from frontend} imageData
 * @param {* response to backend } callback
 */
exports.imageUploadService = (imageData, callback) => {
    try {
        usermodel.imageUpload(imageData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
        return callback(err);
    }
}

/************ Notification Services **************/
/**
 * @description  :  notification services
 * @param {* request from frontend} notificationData
 * @param {* response to backend } callback
 */
exports.notificationService = (notificationData, callback) => {
    try {
        var userID = {
            "_id": notificationData.userID
        }
        var updateField = {
            "notification": notificationData.notification
        }
        usermodel.notification(userID, updateField, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        return callback(err);
    }
}


/************ Search User Services **************/
/**
 * @description  :  search user services
 * @param {* request from frontend} searchUserData
 * @param {* response to backend } callback
 */
exports.searchUserService = (searchUserData, callback) => {
    try {
        console.log('in user service --->', searchUserData)
        var emailID = {
            "email": { $regex: searchUserData.email, $options: 'i' }
        }
        var requiredData = {
            "firstname" : 1,
            "lastname" : 1,
            "email" : 1
        }
        usermodel.searchUser(emailID, requiredData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        return callback(err);
    }
}