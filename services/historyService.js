const {SearchModel} = require('../models/search');

exports.create = async function(searchText) {
    await SearchModel.create({searchText:searchText});
}

exports.searchHistory = async function(searchText) {
    const searchQuery = {
        'searchText': {
            $regex:searchText,
            $options:'i'
        }
    }
    const histories = await SearchModel.find(searchQuery,{'searchText':1, '_id':0}).sort({'createdAt':-1}).limit(5);
    const searchTexts = histories.map(history => history.searchText);
    return searchTexts;
}