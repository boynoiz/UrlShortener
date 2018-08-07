const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');


//// Frontend form
router.get('/', mainController.root);

// Get parameter from url that is shortened
// if exist then response to the client with original url
// response 200 if success and 404 for resource not found
app.get('/:string', mainController.getUrl);
