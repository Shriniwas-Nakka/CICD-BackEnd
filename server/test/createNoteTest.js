/********************************************************
* @purpose : Testing for create note api.
* @file : createNoteTest.js
* @author : Shriniwas Nakka
* @version : npm 3.5.2
* @since : 07.08.2019
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

function readFile() {
    var jsonData = fs.readFileSync('/home/user/Desktop/javascript/FundooNotes/server/test/testcase.json');
    var parse = JSON.parse(jsonData);
    // console.log(parse);
    return parse;
}

describe("Test cases for create note api status", function () {
    /**
    * @describe : test for create note successful
    */
    it("Successfully Creating Note Status 200", function () {
        var json = readFile();
        console.log('token', json.token);
        chai.request(server).post('/fundoo/createNote').send(json.createNote200).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);
        });
    });
    /**
    *@describe : test for fails to create note
    */
    it("Create Note fails Status 400", function () {
        var json = readFile();
        chai.request(server).post('/fundoo/createNote').send(json.createNote400).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
    /**
    *@describe : test for create note fail or invalid data
    */
    it("Create Note Invalid Data Status 422", function () {
        var json = readFile();
        chai.request(server).post('/fundoo/createNote').send(json.createNote422).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(422);
        });
    });
});