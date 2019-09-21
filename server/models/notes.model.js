/***********************************************
 * @Purpose -FundooNotes (Performing CRUD Operations)
 * @file    - notes.model.js
 * @author  - Shriniwas Nakka
 * @since   - 07/08/2019
 ***********************************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('../middleware/logger').logger;
const gcm = require('node-gcm');

/**
*  @description : create instance of notes schema 
*/
var notesSchema = Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'fundoo'
    },
    labelID: [{
        type: Schema.Types.ObjectId,
        ref: 'labels'
    }],
    collaborator: [],
    title: {
        type: String,
        require: [true, 'title should not be empty']
    },
    description: {
        type: String,
        require: [true, 'description should not be empty']
    },
    color: {
        type: String
    },
    reminder: {
        type: Date
    },
    archive: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true
    });

/**
*  @description : Create Collection Name
*/
var notes = mongoose.model('notes', notesSchema);

function noteModel() {

}

/************************ Create Note ************************/
/**
 * @description  :  create note
 * @param {* request from frontend  } noteData
 * @param {* response to backend } callback
 */

noteModel.prototype.createNote = async (noteData, callback) => {
    try {
        console.log('id', noteData);
        var note = new notes({
            "userID": noteData._id,
            "labelID": noteData.labelID,
            "title": noteData.title,
            "description": noteData.description,
            "color": noteData.color,
            "reminder": noteData.reminder,
            "archive": noteData.archive,
            "trash": noteData.trash
        });

        await note.save((err, data) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                console.log('Note created successfully.');
                return callback(null, { 'message': 'Note created successfully!', data });
            }
        });
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************************** Read Note **************************/
/**
 * @description  :  read note
 * @param {* request from frontend  } readNoteData
 * @param {* response to backend } callback
 */

noteModel.prototype.readNotes = async (readNoteData, callback) => {
    try {
        if (readNoteData.noteID) {
            console.log('readdata in model ====>', readNoteData);
            var promise = new Promise((resolve, reject) => {
                notes.findOne({ "_id": readNoteData.noteID }, (err, data) => {
                    if (data != '') {
                        resolve(data)
                    } else {
                        reject(err)
                    }
                })
            })
            promise.then((data) => {
                console.log('data in model ---->', data)
                return callback(null, { message: 'Note data found', data });
            }).catch((err) => {
                err = { error: 'Note data not found' };
                return callback(err);
            })
        } else if (readNoteData.search) {
            console.log('readnotes for search ------> ', readNoteData);
            var promise = new Promise((resolve, reject) => {
                notes.find({
                    $or: [
                        { 'title': { $regex: readNoteData.search, $options: 'i' } },
                        { 'description': { $regex: readNoteData.search, $options: 'i' } },
                        { 'color': { $regex: readNoteData.search, $options: 'i' } },
                        // { 'reminder': { $regex: readNoteData.search, $options: 'i' } }
                    ]
                }, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
            promise.then((data) => {
                return callback(null, data);
            }).catch((err) => {
                return callback(err);
            })
        }
        else if (readNoteData) {
            console.log('data from services---->', readNoteData, readNoteData.archive);
            console.log('data from services---->', readNoteData);
            var promise = new Promise((resolve, reject) => {
                notes.find(readNoteData.find, {}, readNoteData.query, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("data is ==>", data);
                        resolve(data);
                    }
                }).populate('labelID')
            })
            promise.then((data) => {
                return callback(null, { message: readNoteData.message, data });
            }).catch((err) => {
                return callback(err);
            })
        }
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************************** Update Note **************************/
/**
 * @description  :  update note
 * @param {* request from frontend  } updateData
 * @param {* response to backend } callback
 */

noteModel.prototype.updateNote = async (updateData, noteID, callback) => {
    try {
        console.log('in model ----------->', noteID, updateData)
        var promise = new Promise((resolve, reject) => {
            notes.findByIdAndUpdate({ '_id': noteID }, updateData, (err, data) => {
                if (err) {
                    console.log("err--->", err);
                    reject(err)
                } else {
                    console.log("data--->", data);
                    resolve(data)
                }
            })
        })
        promise.then((data) => {
            return callback(null, { 'message': 'Note updated successfully', data });
        }).catch((err) => {
            return callback(err);
        })
    } catch (error) {
        logger.error(err);
        return callback(error);
    }
}

/************************** Delete Note **************************/
/**
 * @description  :  delete note
 * @param {* request from frontend  } noteID
 * @param {* response to backend } callback
 */

noteModel.prototype.deleteNote = async (noteID, callback) => {
    try {
        var promise = new Promise((resolve, reject) => {
            notes.findOneAndRemove({ '_id': noteID }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Note deleted successfully');
                    resolve(data)
                }
            })
        })

        promise.then((data) => {
            return callback(null, { 'message': 'Note deleted successfully!', data });
        }).catch((err) => {
            return callback(err);
        })
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/******************************* PopUp Notification *******************************/

// setInterval(
//     async function () {
//         var promise = new Promise((resolve, reject) => {
//             notes.find({}, (err, data) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     // console.log("data is ==>", data);
//                     resolve(data);
//                 }
//             }).populate('userID')
//         })
//         promise.then((data) => {
//             //    console.log("notification data ---->", data);
//             console.log("loop");
//             for (let i = 0; i < data.length; i++) {
//                 console.log("inside for loop", data[i].userID.notification);
//                 if (data[i].reminder != "" && data[i].userID.notification != "") {

//                     currentDate = new Date();
//                     currentDate = Date.parse(currentDate);
//                     console.log("current date", currentDate)

//                     reminder = data[i].reminder;
//                     reminder = Date.parse(reminder);
//                     console.log("reminder --->", reminder);

//                     if (currentDate > reminder - 1000 && currentDate < reminder + 1000) {
//                         console.log(" time match")
//                         var sendNotification = new gcm.Message(
//                             {
//                                 "notification": {
//                                     "title": "Firebase",
//                                     "body": data[i].title
//                                 },
//                                 "to": data[i].userID.notification
//                             }
//                         );

//                         var sender = gcm.Sender(process.env.FirebaseServerKey);
//                         sender.send(sendNotification, data[i].userID.notification, (err, data) => {
//                             if (err) {
//                                 console.log("failed to send notification", err);
//                             } else {
//                                 console.log("notification sent", data);
//                             }
//                         })
//                     } else {
//                         console.log("time not match")
//                     }
//                     console.log("--->", this.currentDate);
//                 }
//             }

//         }).catch((err) => {
//             console.log("error ---->", err);
//         })
//     }
//     , 5000)

/**
*  @description : exporting function 
*/
module.exports = new noteModel();