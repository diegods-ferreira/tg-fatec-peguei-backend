import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      presentation: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      phone: Joi.string().required(),
      facebook: Joi.string().allow(null, ''),
      instagram: Joi.string().allow(null, ''),
      show_email: Joi.boolean().required(),
      show_facebook: Joi.boolean().required(),
      show_instagram: Joi.boolean().required(),
      show_phone: Joi.boolean().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
