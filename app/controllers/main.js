import path from 'path';
import config from '../config';
import UrlDB from '../models/urlDB';

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

exports.getUrl = (request, response) => {
  UrlDB.findOne(request.params.inputUrl, function (error, shortenurl) {
    if (error) return next (error);
    response.send(shortenurl);
  })
};
