import path from 'path';
import config from '../configs/config';
import UrlModel from '../models/urlModel';


//First page
//Response with vuejs
exports.root = (request, response) => {
  const data = {
    url: config.url
  }
  request.vueOptions.head.title = 'URL Shortener';
  request.vueOptions.head.scripts.push({
    src: 'https://unpkg.com/axios/dist/axios.min.js'
  })
  response.renderVue('main/index.vue', data, request.vueOptions);
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
