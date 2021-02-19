import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import multer from 'multer';
import ItemsController from '../controllers/ItemsController';
import ItemImageController from '../controllers/ItemImageController';
import {
  itemSearchValidation,
  itemUpdateValidation,
} from '../middlewares/validations/request.validations';

const itemsRouter = Router();
const itemsControler = new ItemsController();
const itemImageController = new ItemImageController();
const upload = multer(uploadConfig.multer);

itemsRouter.use(ensureAuthenticated);

itemsRouter.get('/:item_id', itemSearchValidation, itemsControler.show);

itemsRouter.put('/', itemUpdateValidation, itemsControler.update);

itemsRouter.patch('/image', upload.single('image'), itemImageController.update);

export default itemsRouter;
