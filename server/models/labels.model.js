/***********************************************
 * @Purpose -FundooNotes (Performing CRUD Operations)
 * @file    - labels.model.js
 * @author  - Shriniwas Nakka
 * @since   - 14/08/2019
 ***********************************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var redis = require('redis');
var client = redis.createClient();
/**
*  @description : created instance of label schema 
*/
var labelSchema = Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'fundoo'
    },
    labelName: {
        type: String,
        require: [true, 'label name should not be empty']
    }
}, {
        timestamps: true
    });

/**
*  @description : Create Collection Name
*/
var labels = mongoose.model('labels', labelSchema);

function labelModel() { }

/************************ Create Label ************************/
/**
 * @description  :  create label
 * @param {* request from frontend  } createLabelData
 * @param {* response to backend } callback
 */

labelModel.prototype.createLabel = async (createLabelData, callback) => {
    try {
        console.log('create label in model---->', createLabelData.userID);
        var promise = new Promise((resolve, reject) => {
            var label = new labels({
                'userID': createLabelData.userID,
                'labelName': createLabelData.labelName
            })
            label.save((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
        promise.then((data) => {
            console.log('------>', data.userID);
            return callback(null, { message: 'label created successfully.', data });
        }).catch((err) => {
            return callback(err);
        })
    } catch (err) {
        return callback(err);
    }
}

/************************ Read Label ************************/
/**
 * @description  :  read label
 * @param {* request from frontend  } readLabelData
 * @param {* response to backend } callback
 */

labelModel.prototype.readLabel = async (readLabelData, callback) => {
    try {
        console.log('read label in model---->', readLabelData);
        var promise = new Promise((resolve, reject) => {
            labels.find(readLabelData, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }).populate()
        })
        promise.then((data) => {
            console.log('data--->', data);
            // if (data) {
            //     console.log('check data--->', data.length);
            //     client.get("auth" + readLabelData.userID, (err, result) => {
            //         var redisSize = JSON.parse(result);
            //         console.log('empty', redisSize);
            //         if (redisSize.length === data.length) {
            //             console.log('fetching data from redis cache');
            //             return callback(null, { message: 'all labels', data: JSON.parse(result) });
            //         } else {
                        console.log('fetching data from database');
                        client.set("auth" + readLabelData.userID, JSON.stringify(data), redis.print);
                        return callback(null, { message: 'all labels', data });
                    }
                // })
            // }
        // })
        )
    } catch (err) {
        return callback(err);
    }
}

/************************ Update Label ************************/
/**
 * @description  :  update label
 * @param {* request from frontend  } labelID
 * @param {* request from frontend  } updateLabelData
 * @param {* response to backend } callback
 */

labelModel.prototype.updateLabel = async (labelID, updateLabelData, callback) => {
    try {
        console.log('update label in model---->', labelID, updateLabelData);
        var promise = new Promise((resolve, reject) => {
            labels.findOneAndUpdate({ '_id': labelID }, updateLabelData, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        promise.then((data) => {
            return callback(null, { message: 'label updated successfully.', data });
        }).catch((err) => {
            return callback(err);
        })
    } catch (err) {
        return callback(err);
    }
}

/************************ Delete Label ************************/
/**
 * @description  :  delete label
 * @param {* request from frontend  } deleteLabelData
 * @param {* response to backend } callback
 */

labelModel.prototype.deleteLabel = async (deleteLabelData, callback) => {
    try {
        console.log('delete label in model--->', deleteLabelData);
        var promise = new Promise((resolve, reject) => {
            labels.findOneAndRemove(deleteLabelData, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        promise.then((data) => {
            return callback(null, { message: 'label deleted successfully.', data });
        }).catch((err) => {
            return callback(err);
        })
    } catch (err) {
        return callback(err);
    }
}

/**
*  @description : exporting function 
*/
module.exports = new labelModel();