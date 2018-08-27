import path from 'path';
import mongoose from "mongoose";
import UrlSchema from '../models/UrlModel';

const UrlModel = mongoose.model('Url', UrlSchema);

const publicPath = path.join(process.cwd(), 'public');
const templatePath = path.join(process.cwd(), 'views/template')


/**
 * First page
 *
 * @param {Object} request
 * @param {Object} response
 * @returns {Object} response The response object
 */
export function root(request, response) {
  response.sendFile(`${publicPath}/index.html`)
}

/**
 * Find string from db and redirect original url
 *
 * @param {Object} request
 * @param {Object} response
 *
 * TODO:
 * [x]Response to error page if no data exist
 */
export function getUrl(request, response) {

  const requestString = request.params.string;

  UrlModel.findOne({shortenUrl: requestString})
  .then((urlData) => {
    if (urlData) {
      response.status(301).redirect(urlData.originalUrl);
    } else {
      response.status(404).sendFile(`${templatePath}/404.html`)
    }
  })
  .catch((error) => {
    console.log("Errors: " + error);
  });
}
