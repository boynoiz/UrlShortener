import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  originalUrl: {type: String, required: true},
  shortenUrl: {type: String, required: true, max: 8},
  createdAt: {type: Date, default: Date.now}
});

UrlSchema.methods = {
// TODO
// make 'insert' and 'find' method
}

module.exports = mongoose.model('UrlDB', UrlSchema);
