import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import requestPickupOffersRouter from '@modules/request_pickup_offers/infra/http/routes/request_pickup_offer.routes';
import OrdersController from '../controllers/OrdersController';
import OrderPurchaseInvoiceController from '../controllers/OrderPurchaseInvoiceController';
import UserOrdersController from '../controllers/UserOrdersController';
import {
  orderCreationValidation,
  orderDetailsSearchValidation,
  orderSearchValidation,
  orderUpdateValidation,
} from '../middlewares/validations/request.validations';

const ordersRouter = Router();
const ordersController = new OrdersController();
const orderPurchaseInvoiceController = new OrderPurchaseInvoiceController();
const userOrdersController = new UserOrdersController();

const upload = multer(uploadConfig.multer);

ordersRouter.use(ensureAuthenticated);
ordersRouter.use('/pickup-offers', requestPickupOffersRouter);

ordersRouter.get('/', orderSearchValidation, ordersController.index);

ordersRouter.get('/me/', userOrdersController.index);

ordersRouter.get(
  '/:order_id',
  orderDetailsSearchValidation,
  ordersController.show,
);

ordersRouter.post('/', orderCreationValidation, ordersController.create);

ordersRouter.put('/', orderUpdateValidation, ordersController.update);

ordersRouter.patch(
  '/purchase_invoice',
  upload.single('purchase_invoice'),
  orderPurchaseInvoiceController.update,
);

export default ordersRouter;
