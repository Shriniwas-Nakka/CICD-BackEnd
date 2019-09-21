var express = require('express');
var mongodb = require('../models/notes.model');

exports.pagination = (pageData, callback) => {

    console.log('pagination data---->', pageData);
    var pageNo = pageData.pageNo;
    var size = pageData.size;
    var query = {};

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;

    mongodb.notes.find({}, {}, query, (err, data) => {
        if (err) {
            response = {
                "error": true, "message": "Error fetching data"
            };
            return callback(response);
        } else {
            response = {
                "error": false, "message": data
            };
            return callback.json(null, response);
        }
    })
}