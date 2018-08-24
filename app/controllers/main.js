import path from 'path';
import config from '../configs/config';
import UrlModel from '../models/urlModel';

const publicPath = path.join(process.cwd(), 'public');


//First page
//Response with vuejs
exports.root = (request, response) => {

  // const data = {
  //   url: config.url
  // }

  // const vueOptions = {
  //   head: {
  //     title: 'URL Shortener',
  //     metas: [
  //       { name: 'application-name', content: 'URL Shortener from Nodejs, Express, MongoDB and VueJs'}
  //     ],
  //     scripts: [
  //       { src: 'https://unpkg.com/axios/dist/axios.min.js' },
  //       { src: 'https://cdn.jsdelivr.net/npm/sweetalert2' },
  //       { src: 'https://unpkg.com/vue-swal' },
  //       { src: 'https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate.js' },
  //       { src: '/assets/js/app.js' }
  //     ],
  //     styles: [
  //       { style: '//maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' },
  //       { style: 'https://cdn.jsdelivr.net/npm/sweetalert2@7.26.11/dist/sweetalert2.min.css' }
  //     ]
  //   }
  // }

  // response.renderVue('main/index.vue', data, vueOptions);

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
