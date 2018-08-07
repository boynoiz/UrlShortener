const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  original_url: {type: String, required: true},
  shorten_url: {type: String, required: true, max: 8},
});

module.exports = mongoose.model('UrlDB', UrlSchema);
