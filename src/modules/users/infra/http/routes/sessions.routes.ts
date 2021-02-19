import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import { sessionCreationValidation } from '../middlewares/validations/request.validations';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionCreationValidation, sessionsController.create);

export default sessionsRouter;
