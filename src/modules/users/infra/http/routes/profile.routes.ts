import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { profileUpdateValidation } from '../middlewares/validations/request.validations';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/:user_id', profileController.show);
profileRouter.put('/', profileUpdateValidation, profileController.update);

export default profileRouter;
