import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ChatsController from '../controllers/ChatsController';
import {
  chatsSearchValidation,
  chatsCreationValidation,
} from '../middlewares/requests.validations';

const chatsRouter = Router();
const chatsController = new ChatsController();

chatsRouter.use(ensureAuthenticated);

chatsRouter.get('/:id', chatsSearchValidation, chatsController.show);

chatsRouter.get('/', chatsController.index);

chatsRouter.post('/', chatsCreationValidation, chatsController.create);

export default chatsRouter;
