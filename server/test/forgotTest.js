/********************************************************
* @purpose : Checking forgot password api functionality.
* @file : forgotTest.js
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
    // console.log(parse);
    return parse;
}

describe("Test cases for forgot password api status", function(){
    /**
    *@describe : test for forgot password mail sent successful
    */
    it("Forgot password mail sent Status 200", function(){
        var json = readFile();
        // console.log(json.forgot200);

        chai.request(server).post('/fundoo/forgotpassword').send(json.forgot200).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);
        });
    });
    /**
    *@describe : test for forgot password mail id does not exist
    */
    it("Email does not exist Status 400", function(){
        var json = readFile();
        chai.request(server).post('/fundoo/forgotpassword').send(json.forgot400).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
    /**
    *@describe : test for forgot password invalid data
    */
    it("Forgot Invalid Data Status 422", function(){
        var json = readFile();
        chai.request(server).post('/fundoo/forgotpassword').send(json.forgot422).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(422);
        });
    });
});
