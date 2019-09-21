var collaborateService = require('../services/collaborate.services');


/************ Collaborator Controller **************/
/**
 * @description  :  collaborator controller
 * @param {* request from frontend } req
 * @param {* response to backend } res
 */
module.exports.collaboratorController = (req, res) => {
    try {
        req.checkBody('noteID', 'note ID should not be empty').notEmpty();
        req.checkBody('email', 'Email ID should not be empty').notEmpty();
        req.checkBody('email', 'Email ID should not be empty').isEmail();
        var response = {};
        var errors = req.validationErrors();

        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var collaboratorData = {
                userID: req.decoded._id,
                noteID: req.body.noteID,
                email: req.body.email
            }
            collaborateService.collaboratorService(collaboratorData, (err, data) => {
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