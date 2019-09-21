/***********************************************
 * @Purpose -FundooNotes (Label Controller)
 * @file    - labels.controller.js
 * @author  - Shriniwas Nakka
 * @since   - 14/08/2019
 ***********************************************/

var labelService = require('../services/labels.services');

/************ Create Label Controller **************/
/**
 * @description  :  create note controllers
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */

module.exports.createLabelController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('labelName', 'label name should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var labelObject = {
            userID: req.decoded._id,
            labelName: req.body.labelName
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            labelService.createLabelService(labelObject, (err, data) => {
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
        response.success = false;
        response.error = err
        return res(response);
    }
}

/************ Update Label Controller **************/
/**
 * @description  :  update label controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */

module.exports.updateLabelController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('labelName', 'label name should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var labelObject = {
            labelID: req.body.labelID,
            labelName: req.body.labelName
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            labelService.updateLabelService(labelObject, (err, data) => {
                if (err) {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response)
                }
            })
        }
    } catch (err) {
        return res(err);
    }
}

/************ Delete Label Controller **************/
/**
 * @description  :  delete label controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */

module.exports.deleteLabelController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('labelID', 'label id should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var labelObject = {
            labelID: req.body.labelID
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            labelService.deleteLabelService(labelObject, (err, data) => {
                if (err) {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response)
                }
            })
        }
    } catch (err) {
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ All Label Controller **************/
/**
 * @description  :  all note controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */

module.exports.allLabelController = (req, res) => {
    try {
        /**
         * @description : requesting all details
         */
        var allLabel = {
            userID: req.decoded._id
        };
        var response = {};
        labelService.allLabelService(allLabel, (err, data) => {
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
        return res(response);
    }
}