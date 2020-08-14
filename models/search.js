const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    searchText: {
        type: String,
        required: true
    }
    },{
        timestamps: true,
    });

const search = mongoose.model('search', searchSchema);

exports.SearchModel = search;