const express = require('express');
const subdomain = require('express-subdomain');
const app = express();

const main = require('./routes/main');
const api = require('./routes/api');

// Setup mongoose connection

app.use('/', main);
app.use(subdomain('api', api));




