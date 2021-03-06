'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = Schema({
    process: String,
    voteDate: { type: Date, default: Date.now },
    votes: [
        {
            candidate: String,
            forPosition: Number
        }
    ]
});

module.exports = mongoose.model('Vote', VoteSchema);