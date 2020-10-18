import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.get(
  '/:category_name',
  celebrate({
    [Segments.PARAMS]: {
      category_name: Joi.string().required(),
    },
  }),
  categoriesController.show,
);

export default categoriesRouter;
