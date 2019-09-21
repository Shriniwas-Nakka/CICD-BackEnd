/********************************************************
* @purpose : Testing for finding all trash note api.
* @file : allTrashNoteTest.js
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

describe("Test cases for finding all trash notes api status", function () {
    /**
    * @describe : test for finding all trash notes successful
    */
    it("Successfully Finding All Trash Notes Status 200", function () {
        var json = readFile();
        console.log('token', json.token);
        chai.request(server).get('/fundoo/allTrashNote').send(json.allTrashNote200).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(200);
        });
    });
    /**
    *@describe : test for finding all trash notes fails
    */
    it("Find All Trash Notes fails Status 400", function () {
        var json = readFile();
        chai.request(server).get('/fundoo/allTrashNote').send(json.allTrashNote400).set('token', json.token).end((err, data) => {
            expect(err).to.be.null;
            expect(data).to.have.status(400);
        });
    });
});