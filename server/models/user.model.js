/***********************************************
 * @Purpose -FundooNotes (model)
 * @file    - user.model.js
 * @author  - Shriniwas Nakka
 * @since   - 23/07/2019
 ***********************************************/

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mailer = require('../middleware/nodemailer');
var forgotmailer = require('../middleware/forgotmailer');
var tokenGen = require('../middleware/tokenGeneration');
var redis = require('redis');
var client = redis.createClient();
var upload = require('../middleware/aws.services');
// var shortUrl = require('node-url-shortener');
require('dotenv').config();

/**
*  @description : create instance of schema 
*/
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name should not be empty']
    },
    lastname: {
        type: String,
        required: [true, 'Last name should not be empty']
    },
    email: {
        type: String,
        required: [true, 'Email ID should not be empty'],
        unique: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number should not be empty']
    },
    password: {
        type: String,
        required: [true, 'Password should not be empty']
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String
    },
    notification: {
        type: String
    }
},
    {
        timestamps: true
    });
/**
*  @description : Create Collection Name
*/
var user = mongoose.model('fundoo', userSchema);

function userModel() {
}

/**
*  @description : hashing and salting password
*/
function hash(password) {
    /**
    *  @description : Asynchronously generating saltPassword 
    */
    var saltSecret = bcrypt.genSaltSync(10);
    /**
    *  @description : Asynchronously generating hash for given string
    */
    var hashpassword = bcrypt.hashSync(password, saltSecret);
    console.log('hash password', hashpassword);
    return hashpassword;
}

/*************User Registration***************/
/**
 * @description  :  user registration
 * @param {* request from frontend  } registerData
 * @param {* response to backend } callback
 */

userModel.prototype.registration = (registerData, callback) => {
    try {
        user.find({ 'email': registerData.email }, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data.length > 0) {
                let response = { "error": true, "message": 'Email already exist!' };
                return callback(response);
            } else {

                const userDetails = new user({
                    "firstname": registerData.firstname,
                    "lastname": registerData.lastname,
                    "email": registerData.email,
                    "mobile": registerData.mobile,
                    "password": hash(registerData.password),
                    "isVerify": false,
                    "notification": registerData.notification
                });
                console.log('user details', userDetails);

                userDetails.save((err, doc) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        var payload = {
                            "email": registerData.email
                        }
                        console.log('payload', payload);
                        var token = tokenGen.registerTokenGenerate(payload);

                        /**
                        * @description : storing token into redis cache
                        */
                        client.set("auth" + token.token, token.token, redis.print);

                        console.log('token generated', token);
                        console.log('You are registered successfully. Verification mail sent to your registered mail id');

                        var url = `${process.env.URL}/verify/${token.token}`;
                        console.log('url', url);

                        // shortUrl.short(url ,function(err, url){
                        //     console.log('short url ',url);
                        //     mailer.mailsend(registerData.email, url);
                        // });

                        mailer.mailsend(registerData.email, url);
                        return callback(null, doc);
                    }
                });
            }
        });
    } catch (err) {
        return callback(err);
    }
}

/*************User Login***************/
/**
 * @description  :  user login
 * @param {* request from frontend} loginData
 * @param {* response to backend } callback
 */

userModel.prototype.login = (loginData, callback) => {
    try {
        user.findOne({ 'email': loginData.email }, (err, data) => {
            console.log('id in token ', data._id);
            var payload = {
                "email": loginData.email,
                "_id": data._id
            };
            console.log('id in token ', payload);
            if (err) {
                console.log(err);
            }
            if (data) {
                if (data.isVerify === false) {
                    console.log('Email ID is not verified.');
                    var token = tokenGen.loginTokenGenerate(payload);
                    return callback({ 'message': 'Email is not verified.', "token": token });
                }
                bcrypt.compare(loginData.password, data.password, (err, result) => {
                    if (err) {
                        return callback(err);
                    } else if (result) {
                        console.log('Password Match, You are successfully logged in.');
                        var token = tokenGen.loginTokenGenerate(payload);
                        console.log("result id -->", data._id);
                        console.log('------------>>>>>>', token.token)
                        /**
                        * @description : storing token into redis cache
                        */
                        client.set("auth" + token.token, token.token, redis.print);

                        console.log('login token', token);
                        return callback(null, { message: data, "token": token });

                    } else {
                        console.log('Wrong Password, Login failed.');
                        return callback("Incorrect Password").status(500);
                    }
                });
            } else {
                console.log('Email ID does not exist');
                return callback('Email ID does not exist');
            }
        });
    } catch (err) {
        return callback(err);
    }
}

/*************Forgot Password***************/
/**
 * @description  :  forgot password
 * @param {* request from frontend} forgotData
 * @param {* response to backend } callback
 */

userModel.prototype.forgot = (forgotData, callback) => {
    try {
        user.findOne({ 'email': forgotData.email }, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                var payload = {
                    "email": forgotData.email
                };
                var token = tokenGen.forgotTokenGenerate(payload);
                console.log('forgot token ', tokenGen.forgotTokenGenerate(token));

                var url = `${process.env.URL}/resetpassword/:${token.token}`;
                console.log('forgot url', url);

                /**
                * @description : storing token into redis cache
                */
                client.set("auth" + token.token, token.token, redis.print);

                forgotmailer.mailsend(forgotData.email, url);
                return callback(null, { "message": data, "token": token, "url": url });

            } else {
                console.log('Email ID does not exist.');
                return callback({ "message": "Email ID does not exist." });
            }
        });
    } catch (err) {
        return callback(err);
    }
}

/*************Reset Password***************/
/**
 * @description  :  reset password
 * @param {* request from frontend} resetData
 * @param {* response to backend } callback
 */
userModel.prototype.reset = (resetData, callback) => {
    try {
        user.findOne({ email: resetData.email }, (err, found) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else if (resetData.password) {
                console.log('email encoded', { email: resetData.email });
                found.password = hash(resetData.password);
                console.log('new password', found.password);
                found.save((err, data) => {
                    if (err) {
                        return callback(err);
                    } else {
                        console.log('Password Set Successfully.');
                        return callback(null, data);
                    }
                });
            } else {
                console.log('Email ID not found.');
                return callback('Email ID not found.');
            }
        });
    } catch (err) {
        return callback(err);
    }
}

/*************Email Verification***************/
/**
 * @description  :  email verification
 * @param {* request from frontend} verifyData
 * @param {* response to backend } callback
 */
userModel.prototype.verification = (verifyData, callback) => {
    try {
        user.findOne({ email: verifyData.email }, (err, data) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else if (data) {
                console.log('sduyfgyudfhaid', data);
                if (data.isVerify === true) {
                    console.log('Email ID already verified');
                    return callback('Email ID already verified.');
                } else {
                    data.isVerify = true;
                    data.save((err, data) => {
                        if (err) {
                            return callback(err);
                        } else {
                            console.log('The Email ID has been verified. Please log in.');
                            return callback(null, { data, "message": "The Email ID has been verified. Please log in." });
                        }
                    })
                }
            }
        });
    } catch (err) {
        console.log(err);
        return callback(err);
    }
}


/*************Image Upload***************/
/**
 * @description  :  Image Upload
 * @param {* request from frontend} imageData
 * @param {* response to backend } callback
 */
userModel.prototype.imageUpload = (imageData, callback) => {
    try {
        const singleImageUpload = upload.single('image');

        singleImageUpload(imageData, callback, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                console.log('location-->', imageData.file.location);

                user.updateOne({ 'email': imageData.decoded.email },
                    {
                        $set: {
                            'imageUrl': imageData.file.location
                        }
                    }, { upsert: true }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Image Successfully Uploaded!');
                            console.log(null, data);
                        }
                    })
                return callback(null, result);
            }
        })
    } catch (err) {
        return callback(err);
    }
}

/*************Notification Setup***************/
/**
 * @description  :  notification setup
 * @param {* request from frontend  } userID
 * @param {* request from frontend  } notificationData
 * @param {* response to backend } callback
 */

userModel.prototype.notification = async (userID, notificationData, callback) => {
    try {
        await user.findOneAndUpdate(userID, notificationData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, { message: 'Notification set successfully.', data });
            }
        })
    } catch (err) {
        return callback(err);
    }
}

/************* Search User ***************/
/**
 * @description  :  search user setup
 * @param {* request from frontend  } emailID
 * @param {* request from frontend  } requiredData
 * @param {* response to backend } callback
 */

userModel.prototype.searchUser = async (emailID, requiredData, callback) => {
    console.log('in user model --->', emailID, requiredData);
    try {
        await user.find(emailID, requiredData, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, { message: 'users to collaborate', data: data });
            }
        })
    } catch (err) {
        return callback(err);
    }
}


/**
*  @description : exporting function 
*/
module.exports = new userModel();