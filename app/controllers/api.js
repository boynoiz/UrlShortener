import mongoose from 'mongoose';
import randomWords from 'random-words';
import UrlModel from '../models/urlModel';

exports.create = (request, response) => {
  //TODO
  //Create validator function to validate input url

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
    shortenUrl: words
  });

  addNewUrl.save(function (error) {
    const data = {
      message: (!error) ? "OK" : "ERROR",
      inputUrl: request.body.inputUrl,
      outputUrl: words,
    }
    return response.json(data);
  })
}
