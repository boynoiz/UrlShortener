const path = require('path');
const UrlDB = require('../models/urlDB');

exports.root = function (request, response) {
  response.sendFile(path.join(__dirname + '../views/index.html'))
};

exports.getUrl = function (request, response) {
  UrlDB.findOne(request.params.string, function (error, shortenurl) {
    if (error) return next (error);
    response.send(shortenurl);
  })
};
