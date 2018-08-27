import { Router } from 'express';
import { root, getUrl} from '../controllers/main';

const mainRouter = Router();



//// Frontend form
mainRouter.get('/', root);

// Get parameter from url that is shortened
// if exist then response to the client with original url
// response 200 if success and 404 for resource not found
mainRouter.get('/:string', getUrl);

module.exports = mainRouter;
