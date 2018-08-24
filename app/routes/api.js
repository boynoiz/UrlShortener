import { Router } from 'express';
import APIController from '../controllers/api';

const apiRouter = Router();

// Testing route
apiRouter.get('/hello', function(request, response) {
  response.send('Hello, My name is API');
});

//// API Backend
// Get parameter from form action and then generate random string
// store original url and random string in database and response shorten link to client
apiRouter.post('/create', APIController.create);

module.exports = apiRouter;
