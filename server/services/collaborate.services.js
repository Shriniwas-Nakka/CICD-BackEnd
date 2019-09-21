/***********************************************
 * @Purpose -FundooNotes (Services)
 * @file    - user.services.js
 * @author  - Shriniwas Nakka
 * @since   - 23/07/2019
 ***********************************************/

var collaborateModel = require('../models/collaborate.model');

exports.collaboratorService = (collaborateNoteData, callback) => {
    try {
        var collaborateData = {
            "userID": collaborateNoteData.userID,
            "noteID": collaborateNoteData.noteID,
            "collabeID": collaborateNoteData.email
        }
        collaborateModel.collabeNote(collaborateData, (err, data) => {
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