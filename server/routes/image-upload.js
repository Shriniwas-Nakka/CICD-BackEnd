/***********************************************
 * @Purpose -FundooNotes (Note Controller)
 * @file    - image-upload.js
 * @author  - Shriniwas Nakka
 * @since   - 30/07/2019
 ***********************************************/

var express = require('express');
var router = express.Router();

// const upload = require('../middleware/aws.services');

const singleImageUpload = upload.single('image');

router.post('/image_upload', function (req, res) {

    singleImageUpload(req, res, function (err) {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log('Successfully Uploaded!');
            return res.json({ 'message': 'Successfully Uploaded!', 'imageUrl': req.file.location });
        }

    })
});

module.exports = router;