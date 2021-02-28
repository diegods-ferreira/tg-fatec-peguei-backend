import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ChatMessagesController from '../controllers/ChatMessagesController';
import ChatsController from '../controllers/ChatsController';
import {
  chatsSearchValidation,
  chatsCreationValidation,
  chatPreviousMessagesSearchValidation,
} from '../middlewares/requests.validations';

const chatsRouter = Router();
const chatsController = new ChatsController();
const chatMessagesController = new ChatMessagesController();

chatsRouter.use(ensureAuthenticated);

chatsRouter.get('/:id', chatsSearchValidation, chatsController.show);

chatsRouter.get('/', chatsController.index);

chatsRouter.get(
  '/previous-messages/:chat_id',
  chatPreviousMessagesSearchValidation,
  chatMessagesController.index,
);

chatsRouter.post('/', chatsCreationValidation, chatsController.create);

export default chatsRouter;
