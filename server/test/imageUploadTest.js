/********************************************************
* @purpose : Checking image upload api functionality.
* @file : imageUploadTest.js
* @author : Shriniwas Nakka
* @version : npm 3.5.2
* @since : 25.07.2019
*********************************************************/

/**
*@describe : Require the dev-dependencies
*/
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);
chai.should();

/**
*@describe : requiring server.js file 
*/
var server = require('../server');
var fs = require('fs');

/**
*@describe : Reading json Data
*/
function readFile(){
    var jsonData = fs.readFileSync('/home/user/Desktop/javascript/FundooNotes/server/test/testcase.json');
    var parse = JSON.parse(jsonData);
    return parse;
}

describe("Test cases for image upload api status", function(){
    /**
    *@describe : test for user login successful
    */
    it("Image Upload Successful Status 200", function(){
        var json = readFile();

        chai.request(server).post('/fundoo/image_upload').attach('image','/home/user/Pictures/arches-architecture-blur-2190433.jpg','arches-architecture-blur-2190433.jpg').set('token',json.image200.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);                                                                     
        });
    });
    /**
    *@describe : test for user login if email does not exists
    */
    it("Invalid Image Upload data Status 400", function(){
        var json = readFile();
        chai.request(server).post('/fundoo/image_upload').attach('image','/home/user/Pictures/arches-architecture-blur-2190433.jpg').set('token',json.image400.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
});
