/***********************************************
 * @Purpose -FundooNotes (Note Controller)
 * @file    - notes.controller.js
 * @author  - Shriniwas Nakka
 * @since   - 07/08/2019
 ***********************************************/

var noteServices = require('../services/notes.services');
var logger = require('../middleware/logger').logger;

/************ Create Note Controllers **************/
/**
 * @description  :  create note controllers
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */

module.exports.createNoteController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('title', 'title should not be empty').notEmpty();
        req.checkBody('description', 'description should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            _id: req.decoded._id,
            labelID: req.body.labelID,
            title: req.body.title,
            description: req.body.description,
            archive : req.body.archive,
            color: req.body.color,
            reminder: req.body.reminder
        }
        console.log('user ID ---->', req.decoded._id);
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.createNoteService(noteObject, (err, data) => {
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
        console.log(err);
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Update Note Title Controllers **************/
/**
 * @description  :  update note title controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.updateNoteTitleController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('noteID', 'id should not be empty').notEmpty();
        req.checkBody('title', 'title should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            noteID: req.body.noteID,
            title: req.body.title
        }
        console.log('update note ----> ', noteObject);
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.updateNoteTitleService(noteObject, (err, data) => {
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
        console.log(err);
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Update Note Description Controllers **************/
/**
 * @description  :  update note description controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.updateNoteDescriptionController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('noteID', 'id should not be empty').notEmpty();
        req.checkBody('description', 'description should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            noteID: req.body.noteID,
            description: req.body.description
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.updateNoteDescriptionService(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Update Note Color Controllers **************/
/**
 * @description  :  update note color controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.updateNoteColorController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('noteID', 'id should not be empty').notEmpty();
        req.checkBody('color', 'color should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            noteID: req.body.noteID,
            color: req.body.color
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.updateNoteColorService(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Update Note Reminder Controllers **************/
/**
 * @description  :  update note reminder controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.updateNoteReminderController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('noteID', 'id should not be empty').notEmpty();
        req.checkBody('reminder', 'reminder should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            noteID: req.body.noteID,
            reminder: req.body.reminder
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.updateNoteReminderService(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Trash Note Controllers **************/
/**
 * @description  :  trash note controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.trashNoteController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('noteID', 'id should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            noteID: req.body.noteID
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.trashNoteServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Archive Note Controllers **************/
/**
 * @description  :  archive note controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.archiveNoteController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('noteID', 'id should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            noteID: req.body.noteID
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.archiveNoteServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Delete Note Controllers **************/
/**
 * @description  :  delete note controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.deleteNoteController = (req, res) => {
    try {
        /**
         * @description : checking validation using express validator
         */
        req.checkBody('noteID', 'id should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        /**
         * @description : requesting all details
         */
        var noteObject = {
            noteID: req.body.noteID
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.deleteNoteServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ All Trash Note Controllers **************/
/**
 * @description  :  all trash note controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.allTrashNoteController = (req, res) => {
    try {
        /********Start Pagination Code*******/
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);

        var query = {};

        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response);
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        /********End Pagination Code*******/

        /**
         * @description : requesting all details
         */
        var noteObject = {
            _id: req.decoded._id,
            query
        };
        var response = {};
        noteServices.allTrashNoteServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ All Archive Note Controllers **************/
/**
 * @description  :  all archive note controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.allArchiveNoteController = (req, res) => {
    try {
        /********Start Pagination Code*******/
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);

        var query = {};

        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response);
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        /********End Pagination Code*******/

        /**
         * @description : requesting all details
         */
        var noteObject = {
            _id: req.decoded._id,
            query
        };
        var response = {};
        noteServices.allArchiveNoteServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ All Notes Controllers **************/
/**
 * @description  :  all notes controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.allNotesController = (req, res) => {
    try {
        /********Start Pagination Code*******/
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);

        var query = {};

        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response);
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        /********End Pagination Code*******/

        /**
         * @description : requesting all details
         */
        var noteObject = {
            _id: req.decoded._id,
            query
        };

        var response = {};
        noteServices.allNotesServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}


/************ All Reminder Notes Controllers **************/
/**
 * @description  :  all reminder notes controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.allReminderNotesController = (req, res) => {
    try {
        /********Start Pagination Code*******/
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);

        var query = {};

        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response);
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        /********End Pagination Code*******/

        /**
         * @description : requesting all details
         */
        var noteObject = {
            _id: req.decoded._id,
            query
        };

        var response = {};
        noteServices.allReminderNotesServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}


/************ Search Note Controllers **************/
/**
 * @description  :  search note controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.searchNoteController = (req, res) => {
    try {
        /**
         * @description : requesting all details
         */
        var noteObject = {
            search: req.body.search
        }
        var response = {};
        noteServices.searchNoteServices(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Pagination Controllers **************/
/**
 * @description  :  search note controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.paginationController = (req, res) => {
    try {
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);
        var query = {
            pageNo,
            size
        };
        var response = {};
        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response);
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        noteServices.paginationServices(query, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Update Note Label Controllers **************/
/**
 * @description  :  update note label controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.updateNoteLabelController = (req, res) => {
    try {
        req.checkBody('noteID', 'note ID should not be empty').notEmpty();
        req.checkBody('labelID', 'label ID should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        var noteObject = {
            noteID: req.body.noteID,
            labelID: req.body.labelID
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.updateNoteLabelService(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response);
    }
}

/************ Delete Note Label Controllers **************/
/**
 * @description  :  delete note label controllers
 * @param {* request from frontend} req
 * @param {* response to backend } res
 */

module.exports.deleteNoteLabelController = (req, res) => {
    try {
        req.checkBody('noteID', 'note ID should not be empty').notEmpty();
        req.checkBody('labelID', 'label ID should not be empty').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        var noteObject = {
            noteID: req.body.noteID,
            labelID: req.body.labelID
        }
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteServices.deleteNoteLabelService(noteObject, (err, data) => {
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
        logger.error(err);
        response.success = false;
        response.error = err;
        return res(response)
    }
}


/************ Collaborator Controller **************/
/**
 * @description  :  collaborator controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.collaboratorController = (req, res) => {
    try {
        req.checkBody('noteID', 'note ID should not be empty').notEmpty();
        var response = {};
        var errors = req.validationErrors();

        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var collaboratorData = {
                noteID: req.body.noteID,
                userData: req.body.userData
            }
            noteServices.collaboratorService(collaboratorData, (err, data) => {
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


/************ Get Collaborated Users Controller **************/
/**
 * @description  :  get collaborated users controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.collaboratedUserController = (req, res) => {
    try {
        req.checkBody('noteID', 'note ID should not be empty').notEmpty();
        var response = {};
        var errors = req.validationErrors();

        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var collaboratorData = {
                noteID: req.body.noteID
            }
            noteServices.collaboratedUserService(collaboratorData, (err, data) => {
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