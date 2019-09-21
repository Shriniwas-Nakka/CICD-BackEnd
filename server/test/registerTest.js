/********************************************************
* @purpose : Checking register api functionality.
* @file : registerTest.js
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
* @describe : requiring server.js file 
*/
var server = require('../server');
var fs = require('fs');

/**
* @describe : Reading json Data
*/
// var path = require(`${__dirname}`)
// console.log("path",path);

function readFile() {
    var jsonData = fs.readFileSync('/home/user/Desktop/javascript/FundooNotes/server/test/testcase.json');
    var parse = JSON.parse(jsonData);
    // console.log(parse);
    return parse;
}

describe("Test cases for registration api status", function () {
    /**
    * @describe : test for user register successful
    */
    it("Success Registration Status 200", function () {
        var json = readFile();
        // console.log(json.registration200);

        chai.request(server).post('/fundoo/registration').send(json.registration200).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);
        });
    });
    /**
    *@describe : test for user register if email already exists
    */
    it("Register data already exists Status 400", function () {
        var json = readFile();
        chai.request(server).post('/fundoo/registration').send(json.registration400).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
    /**
    *@describe : test for user register fail or invalid data
    */
    it("Fail Registration Status 422", function () {
        var json = readFile();
        chai.request(server).post('/fundoo/registration').send(json.registration422).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(422);
        });
    });
});