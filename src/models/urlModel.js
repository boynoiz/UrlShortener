import mongoose from "mongoose";

/**
 *
 */
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortenUrl: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

UrlSchema.path("shortenUrl").validate(function(value, response) {

  const Url = mongoose.model("Url");

  if (this.isNew || this.isModified("shortenUrl")) {
    Url.count({ shortenUrl: value })
    .exec()
    .then(function(count) {
      return !count;
    })
    .catch (function (error) {
      throw error;
    });
  }
}, 'Shorten word already exists');

export default UrlSchema;
