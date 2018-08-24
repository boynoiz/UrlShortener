import { Router } from 'express';
import mainController from '../controllers/main';

const mainRouter = Router();



//// Frontend form
mainRouter.get('/', mainController.root);

// Get parameter from url that is shortened
// if exist then response to the client with original url
// response 200 if success and 404 for resource not found
mainRouter.get('/:string', mainController.getUrl);

module.exports = mainRouter;
