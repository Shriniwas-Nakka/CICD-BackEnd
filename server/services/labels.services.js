/***********************************************
 * @Purpose -FundooNotes (Label Services)
 * @file    - labels.services.js
 * @author  - Shriniwas Nakka
 * @since   - 14/08/2019
 ***********************************************/

var labelModel = require('../models/labels.model');

/************ Create Label Services **************/
/**
 * @description  :  create label services
 * @param {* request from frontend} createLabelData
 * @param {* response to backend } callback
 */

exports.createLabelService = async (createLabelData, callback) => {
    try {
        createLabel = {
            'userID': createLabelData.userID,
            'labelName': createLabelData.labelName
        }
        console.log('create label name---->', createLabel);
        await labelModel.createLabel(createLabel, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                console.log('user id----->', data.data.userID);
                findData = {
                    "userID": data.data.userID
                }
                labelModel.readLabel(findData, (err, result) => {
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, result);
                    }
                })
                // return callback(null, data);
            }
        })
    } catch (err) {
        return callback(err);
    }
}

/************ Update Label Services **************/
/**
 * @description  :  update label services
 * @param {* request from frontend} updateLabelData
 * @param {* response to backend } callback
 */

exports.updateLabelService = async (updateLabelData, callback) => {
    try {
        updateLabel = {
            "labelName": updateLabelData.labelName
        }
        console.log('update label name---->', updateLabelData);
        await labelModel.updateLabel(updateLabelData.labelID, updateLabel, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                // console.log('user id----->', data.data._id);
                // findData = {
                //     "_id": data.data._id
                // }
                // labelModel.readLabel(findData, (err, result) => {
                //     if (err) {
                //         return callback(err);
                //     } else {
                //         return callback(null, result);
                //     }
                // })
                return callback(null, data);
            }
        })
    } catch (err) {
        return callback(err);
    }
}

/************ Delete Label Services **************/
/**
 * @description  :  delete label services
 * @param {* request from frontend} deleteLabelData
 * @param {* response to backend } callback
 */

exports.deleteLabelService = async (deleteLabelData, callback) => {
    try {
        deleteLabel = {
            "_id": deleteLabelData.labelID
        }
        console.log('delete label name---->', deleteLabelData);
        await labelModel.deleteLabel(deleteLabel, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                findData = {
                    "userID": data.data.userID
                }
                labelModel.readLabel(findData, (err, result) => {
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, result);
                    }
                })
                // return callback(null, data);
            }
        })
    } catch (err) {
        return callback(err);
    }
}

/************ All Label Services **************/
/**
 * @description  : all label services
 * @param {* request from frontend} allLabelData
 * @param {* response to backend } callback
 */

exports.allLabelService = async (allLabelData, callback) => {
    try {
        findData = {
            "userID": allLabelData.userID
        }
        console.log('all label ---->', findData);
        labelModel.readLabel(findData, (err, data) => {
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