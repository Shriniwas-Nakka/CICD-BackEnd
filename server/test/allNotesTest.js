/********************************************************
* @purpose : Testing for finding all notes api.
* @file : allNotesTest.js
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

describe("Test cases for finding all notes api status", function () {
    /**
    * @describe : test for finding all notes successful
    */
    it("Successfully Finding All Notes Status 200", function () {
        var json = readFile();
        console.log('token', json.token);
        chai.request(server).get('/fundoo/allNotes').send(json.allNotes200).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);
        });
    });
    /**
    * @describe : test for finding all notes fails
    */
    it("Find All Notes fails Status 400", function () {
        var json = readFile();
        chai.request(server).get('/fundoo/allNotes').send(json.allNotes400).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
});