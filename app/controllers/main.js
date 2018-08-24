import path from 'path';
import UrlModel from '../models/urlModel';

const publicPath = path.join(process.cwd(), 'public');


//First page
exports.root = (request, response) => {
  response.sendFile(publicPath + '/index.html')
};

//Find string from db and redirect original url
exports.getUrl = (request, response) => {
  const requestString = request.params.string;
  UrlModel.findOne({shortenUrl: requestString})
  .then((urlData) => {
    if (urlData) {
      response.status(301).redirect(urlData.originalUrl);
    } else {
      //TODO
      //Response to error page if no data exist
      console.log("No data exist")
    }
  })
  .catch((error) => {
    console.log("Errors: " + error);
  });
};
