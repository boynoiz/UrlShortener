import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  originalUrl: {type: String, required: true},
  shortenUrl: {type: String, required: true, max: 8},
  createdAt: {type: Date, default: Date.now}
});

const UrlModel = mongoose.model('url', UrlSchema);

module.exports = UrlModel;