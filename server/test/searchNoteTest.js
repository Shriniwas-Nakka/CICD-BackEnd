/********************************************************
* @purpose : Testing for searching notes api.
* @file : searchNoteTest.js
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

describe("Test cases for searching notes api status", function () {
    /**
    * @describe : test for searching notes successful
    */
    it("Successfully Searching Notes Status 200", function () {
        var json = readFile();
        console.log('token', json.token);
        chai.request(server).get('/fundoo/searchNote').send(json.searchNote200).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);
        });
    });
    /**
    *@describe : test for searching notes fails
    */
    it("Searching Notes fails Status 400", function () {
        var json = readFile();
        chai.request(server).get('/fundoo/searchNote').send(json.searchNote400).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
});