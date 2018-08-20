import randomWords from 'random-words';

exports.create = (request, response) => {
  const words = randomWords({
    exactly: 1,
    wordsPerString:2,
    separator: '-',
    formatter: (word, index) => {
      return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
    }
  });

  const data = {
    message: "OK",
    inputUrl: request.body.inputUrl,
    outputUrl: words,
  }

  response.json(data);
}
