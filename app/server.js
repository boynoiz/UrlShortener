import path from 'path';
import express from 'express';
import expressVue from 'express-vue';
import errorHandler from 'errorhandler';
import subdomain from 'express-subdomain';
import morgan from 'morgan';
import mainRouter from './routes/main';
import apiRouter from './routes/api';
import config from './config';

// Start the engine
const app = express();

// Logging
app.use(morgan('combined'));

// Handle all error in development mode
if(config.env === 'development') {
  app.use(errorHandler())
}

// Use express-vue to render vue template and components
const vueOptions = {
  rootPath: path.join(__dirname, 'views')
}

const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);

// Setup mongoose connection

// Routing
app.use('/', mainRouter);
app.use(subdomain('api', apiRouter));

// Listening
app.listen(config.port, ()=> {
  console.log('App start listening on port ' + config.port)
});

module.exports = app;
