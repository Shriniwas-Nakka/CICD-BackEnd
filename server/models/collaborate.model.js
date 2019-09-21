var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collaborateSchema = Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'fundoo'
    },
    noteID: {
        type: Schema.Types.ObjectId,
        ref: 'notes'
    },
    collabeID: {
        type: String,
        ref: 'fundoo'
    }
}, {
        timestamps: true
    });

var collaborate = mongoose.model('collaborator', collaborateSchema);

class collaborater {
    async collabeNote(collabeNoteData, callback) {
        try {
            var promise = new Promise((resolve, reject) => {
                var collabeData = new collaborate(collabeNoteData);
                collabeData.save((err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
            promise.then((data) => {
                console.log("Note Collaborated", data)
                return callback(null, { message: 'Note Collaborated', data: data });
            })
                .catch((err) => {
                    console.log("Failed to Collaborate Note", err)
                    return callback(null, { message: 'Failed to Collaborate Note', error: err });
                })
        } catch (err) {

        }
    }
}

module.exports = new collaborater();