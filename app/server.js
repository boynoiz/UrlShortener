import path from 'path';
import express from 'express';
import expressVue from 'express-vue';
import errorHandler from 'errorhandler';
import subdomain from 'express-subdomain';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

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
const mongoDB = 'mongodb://' + config.db_host + ':27017/shurl';
mongoose.connect(mongoDB,{ useNewUrlParser: true});
mongoose.Promise = global.Promise;

// Set default connection
const db = mongoose.connection;

// Handle mongoDB connection error
if(config.env === 'development') {
  db.on('error', console.error.bind(console, 'MongoDB connection error: '));
}

// Use bodyParser with urlencoded as middleware to handle data from the form
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.use('/', mainRouter);
app.use(subdomain('api', apiRouter));

// Listening
app.listen(config.port, ()=> {
  console.log('App start listening on port ' + config.port)
});

module.exports = app;
