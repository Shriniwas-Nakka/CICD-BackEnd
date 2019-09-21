/***********************************************
 * @Purpose -FundooNotes (Controllers)
 * @file    - user.controllers.js
 * @author  - Shriniwas Nakka
 * @since   - 23/07/2019
 ***********************************************/

var userServices = require('../services/user.services');
var collaboratorService = require('../services/collaborate.services');
var async = require('async');

/************ User Register Controllers **************/
/**
 * @description  :  user register controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */
module.exports.registerController = (req, res) => {
    try {
        /**
         * @description : validations for user registration using express validator
         */
        req.checkBody('firstname', 'Firstname should not be empty').notEmpty();
        req.checkBody('firstname', 'Firstname is invalid').isLength({ min: 3 });
        req.checkBody('lastname', 'Lastname should not be empty').notEmpty();
        req.checkBody('lastname', 'Lastname is invalid').isLength({ min: 3 });
        req.checkBody('email', 'Email ID should not be empty').notEmpty();
        req.checkBody('email', 'Email ID is invalid').isEmail();
        req.checkBody('mobile', 'Mobile number should not be empty').notEmpty();
        req.checkBody('mobile', 'Mobile number should be 10 digit').isLength({ min: 10, max: 10 });
        req.checkBody('password', 'Password should not be empty').notEmpty();
        req.checkBody('password', 'Password should be atleast 8 characters long').isLength({ min: 8 }).equals(req.body.password);

        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.success = false;
            response.error = error;
            return res.status(422).send(response);
        } else {

            userServices.registerService(req.body, (err, data) => {
                if (err) {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response);
                }
            });
        }
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response)
    }
}

/************ User Login Controller **************/
/**
 * @description  :  user login controller
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */
module.exports.loginController = (req, res) => {
    try {
        /**
         * @description : validations for user login using express validator
         */
        req.checkBody('email', 'Email ID should not be empty').notEmpty();
        req.checkBody('email', 'Email ID is invalid').isEmail();
        req.checkBody('password', 'Password should not be empty').notEmpty();
        req.checkBody('password', 'Password should be atleast 8 characters long').isLength({ min: 8 }).equals(req.body.password);

        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.success = false;
            response.error = error;
            return res.status(422).send(response);
        } else {
            console.log('--->', req.body);
            userServices.loginService(req.body, (err, data) => {
                var response = {};
                if (err) {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response);
                }
            });
        }
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response)
    }
}

/************ Forgot Password Controller **************/
/**
 * @description  :  forgot password controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.forgotController = (req, res) => {
    try {
        /**
         * @description : validations for forgot password using express validator
         */
        req.checkBody('email', 'Email ID should not be empty').notEmpty();
        req.checkBody('email', 'Email ID is invalid').isEmail();

        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.success = false;
            response.error = error;
            return res.status(422).send(response);
        } else {
            userServices.forgotService(req.body, (err, data) => {
                if (err) {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response);
                }
            });
        }
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response)
    }
}

/************ Reset Password Controller **************/
/**
 * @description  :  reset password controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.resetController = (req, res) => {
    try {
        /**
         * @description : validations for reset password using express validator
         */
        req.checkBody('password', 'Password should not be empty').notEmpty();
        req.checkBody('password', 'Password should be atleast 8 characters long').isLength({ min: 8 }).equals(req.body.password);
        console.log('reset data', req.decoded, req.body);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.success = false;
            response.error = error;
            return res.status(422).send(response);
        } else {
            var objParam = {
                email: req.decoded.email,
                password: req.body.password
            }
            console.log('object-->', objParam);
            userServices.resetService(objParam, (err, data) => {
                if (err) {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response);
                }
            });
        }
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response)
    }
}

/************ Email Verification Controller **************/
/**
 * @description  :  email verification controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.verifyController = (req, res) => {
    try {
        var response = {};
        var objParam = {
            email: req.decoded.email
        }
        console.log('verify email decoded', obj);
        userServices.verifyService(objParam, (err, data) => {
            if (err) {
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.result = data;
                return res.status(200).send(response);
            }
        });
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response)
    }
}

/************ Image Upload Controller **************/
/**
 * @description  :  image upload controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.imageUploadController = (req, res) => {
    try {
        console.log("body is ==>", req.body);

        var response = {};
        userServices.imageUploadService(req, (err, data) => {
            if (err) {
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.result = data;
                return res.status(200).send(response);
            }
        })
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response)
    }
}

/************ Notification Controller **************/
/**
 * @description  :  notification controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.notificationController = (req, res) => {
    try {
        var updatedata = {
            userID: req.decoded._id,
            notification: req.body.notification
        }
        var response = {};
        userServices.notificationService(updatedata, (err, data) => {
            if (err) {
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.result = data;
                return res.status(200).send(response);
            }
        })
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response)
    }
}


/************ Search User Controller **************/
/**
 * @description  :  search user controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.searchUserController = (req, res) => {
    try {
        req.checkBody('email', 'Email ID should not be empty').notEmpty();
        var response = {};
        var errors = req.validationErrors();

        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var collaboratorData = {
                email: req.body.email
            }
            userServices.searchUserService(collaboratorData, (err, data) => {
                if (err) {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response);
                }
            })
        }

    } catch (err) {
        return res
    }
}


module.exports.collabController = async (req, res) => {
    try {
        req.checkBody('email', 'Email ID should not be empty').notEmpty();
        var response = {};
        var errors = req.validationErrors();

        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var collaboratorData = {
                email: req.body.email
            }

            var collabeData={
                noteID: req.body.email                    
            }
            console.log("in collaborator --->", collaboratorData);
            async.series([
                /*********/
                function (callback) {
                    userServices.searchUserService(collaboratorData, (err, data) => {
                        console.log("in collaborator service --->", collaboratorData);
                        if (err) {
                            response.success = false;
                            response.error = err;
                            callback(response);
                            // return res.status(400).send(response);
                        } else {
                            response.success = true;
                            response.result = data;
                            console.log("from service", data)
                            callback(null, response)
                            // return res.status(200).send(response);
                        }
                    })
                },
                /*********/

            ], function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                } else {
                    console.log("--->", result);
                    return res.status(200).send(result);
                }
            })
        }

    } catch (err) {
        return res
    }
}


// async.series([userServices.searchUserService(collaboratorData)], (err, data) => {
//     if (err) {
//         console.log("error---->", err);
//     } else {
//         console.log("data---->", data);
//     }
// })
