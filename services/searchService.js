const config = require('config');
const request = require('request');
let baseUrl = 'https://www.googleapis.com/customsearch/v1?key='+config.get('G_KEY')+'&cx='+config.get('CS_ID')+'&num=5&q=';

//utility function for google APIs
function doSearching(url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
}

exports.search = async function(searchText) {
    try {
        //Make external API call for search results
        const searchUrl = `${baseUrl}${searchText}`;  
        const results = await doSearching(searchUrl);
        const items = JSON.parse(results).items;
        const links = []
        items.forEach(item => {
            links.push(item.link);
        })
        return links;
    } catch(err) {
        console.error(err);
    }
};
