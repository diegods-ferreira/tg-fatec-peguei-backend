import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import multer from 'multer';
import ItemsController from '../controllers/ItemsController';

const itemsRouter = Router();
const itemsControler = new ItemsController();
const upload = multer(uploadConfig.multer);

itemsRouter.use(ensureAuthenticated);

itemsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required().uuid(),
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      weight: Joi.number().required(),
      width: Joi.number().required(),
      height: Joi.number().required(),
      depth: Joi.number().required(),
      packing: Joi.string().required(),
      category_id: Joi.number().required(),
      weight_unit_id: Joi.number().required(),
      dimension_unit_id: Joi.number().required(),
      description: Joi.string().required(),
    },
  }),
  itemsControler.update,
);

itemsRouter.patch('/image', upload.single('image'), itemsControler.uploadImage);

export default itemsRouter;
