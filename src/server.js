import express from 'express';
import errorHandler from 'errorhandler';
import subdomain from 'express-subdomain';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import all router
import mainRouter from './routes/main';
import apiRouter from './routes/api';

// Importing config
import Config from './configs/config';
const config = new Config();

// Start the engine
const app = express();

// Logging
app.use(morgan('combined'));

// Handle all error in development mode
if(config.env === 'development') {
  app.use(errorHandler())
}

// Setup mongoose connection
const mongoDBUri = `mongodb://${config.db_user}:${config.db_password}@${config.db_host}:27017/${config.db_name}?authSource=admin`;

mongoose.connect(mongoDBUri, { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log ('ERROR connecting to: ' + config.db_host + '. ' + error);
    } else {
    console.log ('Succeeded connected to: ' + config.db_host);
    }
});

// Assign mongoose to Promise that we able to play around with async/await
mongoose.Promise = global.Promise;

// Use bodyParser with urlencoded as middleware to handle data from the form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.use(subdomain('api', apiRouter));
app.use('/', mainRouter);

// Listening
app.listen(config.port, ()=> {
  console.log(`App start listening on port ${config.port}`)
});

module.exports = app;
