import randomWords from 'random-words';
import mongoose from 'mongoose';
import UrlSchema from '../models/UrlModel';

const UrlModel = mongoose.model('Url', UrlSchema);

/**
 * Create a new shorten url
 *
 * TODO:
 * -- []Create validator function to validate input url
 *
 */
export function create(request, response) {

  let inputUrl = request.body.inputUrl;
  let inputWord = request.body.inputWord;

  let addNewUrl = new UrlModel({
    originalUrl: inputUrl,
    shortenUrl: inputWord
  });

  addNewUrl.save((error, url) => {
    if (error) {
      let data = {
        message: "ERROR",
        details: error,
        status: 409
      };
      response.sendStatus = 409;
      return response.json(data);
    }

    let data = {
      message: "OK",
      details: url,
      status: 200
    };
    response.sendStatus = 200;
    return response.json(data);
  })

}

/**
 * Generator words string
 *
 *
 */

export function words(request, response) {

  let words = randomWords({
    exactly: 1,
    wordsPerString:2,
    separator: '-',
    formatter: (word, index) => {
      return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
    }
  });

  let data = {
    message: "OK",
    details: words[0],
    status: 200
  }
  response.sendStatus = 200;
  return response.json(data)
}
