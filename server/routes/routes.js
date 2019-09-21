/***********************************************
 * @Purpose -FundooNotes (Routes)
 * @file    - routes.js
 * @author  - Shriniwas Nakka
 * @since   - 23/07/2019
 ***********************************************/

var express = require('express');
var routes = express.Router();
var userController = require('../controllers/user.controllers');
var auth = require('../middleware/tokenVerification');
var noteController = require('../controllers/notes.controller');
var labelController = require('../controllers/labels.controller');

/**
 * @description: routes for user registration, login, verification, forgot password, reset password, image upload & notification
 */
routes.post('/registration', userController.registerController);
routes.post('/login', userController.loginController);
routes.post('/forgotpassword', userController.forgotController);
routes.post('/resetpassword/:token', auth.tokenVerification, userController.resetController);
routes.post('/verify/:token', auth.tokenVerification, userController.verifyController);
routes.post('/image_upload', auth.tokenVerification, userController.imageUploadController);
routes.put('/notification', auth.tokenVerification, userController.notificationController);

/**
 * @description: collaborater
 */
routes.post('/searchUserCollaborate', auth.tokenVerification, userController.searchUserController);
routes.post('/collaborateNote', auth.tokenVerification, noteController.collaboratorController);
routes.get('/getCollaboratedUser', auth.tokenVerification, noteController.collaboratedUserController);

routes.post('/collaborator', auth.tokenVerification, userController.collabController)

/**
 * @description: route for creating notes
 */
routes.post('/createNote', auth.tokenVerification, noteController.createNoteController);

/**
 * @description: routes for updating title, description, color & reminder of notes 
 */
routes.put('/updateNoteTitle', auth.tokenVerification, noteController.updateNoteTitleController);
routes.put('/updateNoteDescription', auth.tokenVerification, noteController.updateNoteDescriptionController);
routes.put('/updateNoteColor', auth.tokenVerification, noteController.updateNoteColorController);
routes.put('/updateNoteReminder', auth.tokenVerification, noteController.updateNoteReminderController);

/**
 * @description: routes for trash notes , archive notes & delete notes
 */
routes.put('/trashNote', auth.tokenVerification, noteController.trashNoteController);
routes.put('/archiveNote', auth.tokenVerification, noteController.archiveNoteController);
routes.put('/deleteNote', auth.tokenVerification, noteController.deleteNoteController);

/**
 * @description: routes for finding all trash notes , archive notes & all notes
 */
routes.get('/allTrashNote', auth.tokenVerification, noteController.allTrashNoteController);
routes.get('/allArchiveNote', auth.tokenVerification, noteController.allArchiveNoteController);
routes.get('/allNotes', auth.tokenVerification, noteController.allNotesController);
routes.get('/allReminderNote', auth.tokenVerification, noteController.allReminderNotesController);

/**
 * @description: routes for search note base on title, description, color, & reminder
 */
routes.get('/searchNote', auth.tokenVerification, noteController.searchNoteController);

/**
 * @description: pagination diplay number of notes per page
 */
// routes.get('/pagination', auth.tokenVerification, noteController.paginationController);

/**
 * @description: route for creating labels
 */
routes.post('/createLabel', auth.tokenVerification, labelController.createLabelController);

/**
 * @description: route for updating labels
 */
routes.put('/updateLabel', auth.tokenVerification, labelController.updateLabelController);

/**
 * @description: route for deleting labels
 */
routes.post('/deleteLabel', auth.tokenVerification, labelController.deleteLabelController);

/**
 * @description: routes for finding all labels
 */
routes.get('/allLabels', auth.tokenVerification, labelController.allLabelController);

/**
 * @description: routes for adding label in notes
 */
routes.put('/updateNoteLabel', auth.tokenVerification, noteController.updateNoteLabelController);

/**
 * @description: routes for pulling label in notes
 */
routes.delete('/deleteNoteLabel', auth.tokenVerification, noteController.deleteNoteLabelController);

/**
 * @description: exporting routes
 */
module.exports = routes;