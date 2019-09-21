/***********************************************
 * @Purpose -FundooNotes (Note Services)
 * @file    - notes.services.js
 * @author  - Shriniwas Nakka
 * @since   - 07/08/2019
 ***********************************************/

var notesModel = require('../models/notes.model');
var logger = require('../middleware/logger').logger;

/************ Create Note Services **************/
/**
 * @description  :  create note services
 * @param {* request from frontend} noteData
 * @param {* response to backend } callback
 */

exports.createNoteService = async (noteData, callback) => {
    try {
        await notesModel.createNote(noteData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ Update Note Title Services **************/
/**
 * @description  :  updating title of note
 * @param {* request from frontend} updateNoteData
 * @param {* response to backend } callback
 */

exports.updateNoteTitleService = async (updateNoteData, callback) => {
    try {
        var updateField = {
            "title": updateNoteData.title
        }
        await notesModel.updateNote(updateField, updateNoteData.noteID, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                console.log('services', updateNoteData)
                return callback(null, data);
            }
        });
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ Update Note Description Services **************/
/**
 * @description  :  updating description of note
 * @param {* request from frontend} updateDescriptionData
 * @param {* response to backend } callback
 */

exports.updateNoteDescriptionService = async (updateDescriptionData, callback) => {
    try {
        var updateField = {
            "description": updateDescriptionData.description
        }
        await notesModel.updateNote(updateField, updateDescriptionData.noteID, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ Update Note Color Services **************/
/**
 * @description  :  updating color of note
 * @param {* request from frontend} updateColorData
 * @param {* response to backend } callback
 */

exports.updateNoteColorService = async (updateColorData, callback) => {
    try {
        var updateField = {
            "color": updateColorData.color
        }
        await notesModel.updateNote(updateField, updateColorData.noteID, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ Update Note Reminder Services **************/
/**
 * @description  :  updating reminder of note
 * @param {* request from frontend} updateReminderData
 * @param {* response to backend } callback
 */

exports.updateNoteReminderService = async (updateReminderData, callback) => {
    try {
        var updateField = {
            "reminder": updateReminderData.reminder
        }
        await notesModel.updateNote(updateField, updateReminderData.noteID, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ Trash Note Services **************/
/**
 * @description  :  sending notes to trash and restore from trash
 * @param {* request from frontend} trashData
 * @param {* response to backend } callback
 */

exports.trashNoteServices = async (trashData, callback) => {
    try {
        console.log('trash --->', trashData.noteID);
        await notesModel.readNotes(trashData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                console.log('in trash service', data, trashData.noteID);
                if (data.data.trash === false || data.data.trash === true) {
                    var updateField = { trash: !data.data.trash }
                    trashData = notesModel.updateNote(updateField, trashData.noteID, (err, data) => {
                        if (err) {
                            return callback(err)
                        } else {
                            return callback(null, data);
                        }
                    })
                }
            }
        })
    }  catch (error) {
        logger.error(error);
        return callback(error);
    }
}

/************ Archive Note Services **************/
/**
 * @description  :  sending notes to archive and retrive from archive
 * @param {* request from frontend} archiveData
 * @param {* response to backend } callback
 */

exports.archiveNoteServices = async (archiveData, callback) => {
    try {
        console.log('in archive --->', archiveData.noteID);
        await notesModel.readNotes(archiveData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                console.log('in archive services-->', data, archiveData.noteID);
                if (data.data.archive === false || data.data.archive === true) {
                    var updateField = { archive: !data.data.archive }
                    archiveData = notesModel.updateNote(updateField, archiveData.noteID, (err, data) => {
                        if (err) {
                            return callback(err);
                        } else {
                            return callback(null, data);
                        }
                    })
                }
            }
        })
    } catch (error) {
        logger.error(error);
        return callback(error);
    }
}

/************ Delete Note Services **************/
/**
 * @description  :  deleting note permanently
 * @param {* request from frontend} deleteNoteData
 * @param {* response to backend } callback
 */

exports.deleteNoteServices = async (deleteNoteData, callback) => {
    try {
        console.log('permanent delete --->', deleteNoteData.noteID);
        await notesModel.readNotes(deleteNoteData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                console.log('in trash service', data, deleteNoteData.noteID);
                if (data.data.trash === true) {
                    deleteNoteData = notesModel.deleteNote(deleteNoteData.noteID, (err, data) => {
                        if (err) {
                            return callback(err)
                        } else {
                            return callback(null, data);
                        }
                    })
                } else {
                    console.log('Note is not in trash');
                    return callback(null, { 'message': 'Note is not in trash', data });
                }
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ All Trash Note Services **************/
/**
 * @description  :  finding all note which is present inside the trash
 * @param {* request from frontend} trashNoteData
 * @param {* response to backend } callback
 */

exports.allTrashNoteServices = async (trashNoteData, callback) => {
    try {
        console.log('all trash data services---->', trashNoteData);
        var find = {
            $and: [{ 'userID': trashNoteData._id }, { 'trash': true }]
        }
        var findAllTrash = {
            find, 
            query : trashNoteData.query,
            message : 'All Trash Notes'
        }
        console.log('find--------->', find);
        await notesModel.readNotes(findAllTrash, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ All Archive Note Services **************/
/**
 * @description  :  finding all note which is present inside the archive
 * @param {* request from frontend} archiveNoteData
 * @param {* response to backend } callback
 */

exports.allArchiveNoteServices = async (archiveNoteData, callback) => {
    try {
        console.log('all archive data services---->', archiveNoteData);
        var find = {
            $and: [{ 'userID': archiveNoteData._id }, { 'trash': false }, { 'archive': true }]
        }
        var findAllArchive = {
            find, 
            query : archiveNoteData.query,
            message : 'All Archive Notes'
        }
        console.log('find--------->', find);
        await notesModel.readNotes(findAllArchive, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err);
    }
}

/************ All Notes Services **************/
/**
 * @description  :  finding all notes 
 * @param {* request from frontend} allNoteData
 * @param {* response to backend } callback
 */

exports.allNotesServices = (allNoteData, callback) => {
    try {
        console.log('all notes services------>', allNoteData);
        var find = {
            $and: [{ 'userID': allNoteData._id }, { 'trash': false }, { 'archive': false }] 
        }
        var findAllNotes = {
            find, 
            query : allNoteData.query,
            message : 'All Notes'
        }
        console.log('find--------->>>', find);
        notesModel.readNotes(findAllNotes, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err)
    }
}

/************ All Reminder Notes Services **************/
/**
 * @description  :  finding all notes 
 * @param {* request from frontend} allReminderNoteData
 * @param {* response to backend } callback
 */

exports.allReminderNotesServices = (allReminderNoteData, callback) => {
    try {
        console.log('all reminder notes services------>', allReminderNoteData);
        var find = {
            $and: [{ 'userID': allReminderNoteData._id }, { 'reminder' : { $ne : null } }, { 'trash' : false }] 
        }
        var findAllNotes = {
            find, 
            query : allReminderNoteData.query,
            message : 'All Reminder Notes'
        }
        console.log('find--------->>>', find);
        notesModel.readNotes(findAllNotes, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err)
    }
}


/************ Search Note Services **************/
/**
 * @description  :  finding notes based on title, color, dscription & reminder (partial search)
 * @param {* request from frontend} searchData
 * @param {* response to backend } callback
 */

exports.searchNoteServices = async (searchData, callback) => {
    try {
        console.log('in search---->', searchData);
        await notesModel.readNotes(searchData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err)
    }
}

/************ Pagination Services **************/
/**
 * @description  :  pagination service
 * @param {* request from frontend} paginationData
 * @param {* response to backend } callback
 */

exports.paginationServices = async (paginationData, callback) => {
    try {
        console.log('pagination data---->', paginationData);
        await notesModel.readNotes(paginationData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    } catch (err) {
        logger.error(err);
        return callback(err)
    }
}

exports.updateNoteLabelService = async (updateNoteLabelData, callback) => {
    try{
        console.log('update note label in service--->', updateNoteLabelData);
        var updateField = {
            $push : { labelID : updateNoteLabelData.labelID }
        }
        await notesModel.updateNote(updateField, updateNoteLabelData.noteID, (err, data) => {
            if(err){
                return callback(err);
            }else{
                return callback(null, data);
            }
        })
    }catch(err){
        return callback(err);
    }
}

exports.deleteNoteLabelService = async (deleteNoteLabelData, callback) => {
    try{
        console.log('delete note label in service---->', deleteNoteLabelData);
        var deleteField = {
            $pull : { labelID : deleteNoteLabelData.labelID }
        }
        await  notesModel.updateNote(deleteField, deleteNoteLabelData.noteID, (err, data) => {
            if(err){
                return callback(err);
            }else{
                return callback(null, data);
            }
        })
    }catch(err){
        return callback(err);
    }
}

exports.collaboratorService = async (collaborateDate, callback) => {
    try{
        console.log('collaborated note in service---->', collaborateDate);
        var collabeData = {
            $push : { collaborator : collaborateDate.userData }
        }
        await  notesModel.updateNote(collabeData, collaborateDate.noteID, (err, data) => {
            if(err){
                return callback(err);
            }else{
                return callback(null, data);
            }
        })
    }catch(err){
        return callback(err);
    }
}


exports.collaboratedUserService = async (collaborateDate, callback) => {
    try{
        console.log('get all collab note in service---->', collaborateDate);
        await  notesModel.readNotes(collaborateDate, (err, data) => {
            if(err){
                return callback(err);
            }else{
                return callback(null, data);
            }
        })
    }catch(err){
        return callback(err);
    }
}