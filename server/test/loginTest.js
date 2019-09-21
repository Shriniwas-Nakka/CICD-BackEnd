/********************************************************
* @purpose : Checking login api functionality.
* @file : loginTest.js
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

describe("Test cases for login api status", function(){
    /**
    *@describe : test for user login successful
    */
    it("Login Successful Status 200", function(){
        var json = readFile();
        console.log(json.login200);

        chai.request(server).post('/fundoo/login').send(json.login200).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);                                                                     
        });
    });
    /**
    *@describe : test for user login if email does not exists
    */
    it("Invalid login data Status 400", function(){
        var json = readFile();
        chai.request(server).post('/fundoo/login').send(json.login400).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
    /**
    *@describe : test for user login fail or invalid data (email & password).
    */
    it("Login failed Status 422", function(){
        var json = readFile();
        chai.request(server).post('/fundoo/login').send(json.login422).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(422);
        });
    });
});
