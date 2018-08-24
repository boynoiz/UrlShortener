import randomWords from 'random-words';
import UrlModel from '../models/urlModel';

/**
 * TODO:
 * -- []Create validator function to validate input url
 *
 */
exports.create = (request, response) => {

  const words = randomWords({
    exactly: 1,
    wordsPerString:2,
    separator: '-',
    formatter: (word, index) => {
      return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
    }
  });

  const addNewUrl = new UrlModel({
    originalUrl: request.body.inputUrl,
    shortenUrl: words[0]
  });

  addNewUrl.save(function (error) {
    const data = {
      message: (!error) ? "OK" : "ERROR",
      details: (!error) ? "Your url already shorten as:" : error,
      inputUrl: request.body.inputUrl,
      outputUrl: words[0],
      status: (!error) ? 200 : 500
    };
    console.log("Data saved!");
    return response.json(data);
  })
};
