import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import OrdersController from '../controllers/OrdersController';
import OrderPurchaseInvoiceController from '../controllers/OrderPurchaseInvoiceController';
import UserOrdersController from '../controllers/UserOrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();
const orderPurchaseInvoiceController = new OrderPurchaseInvoiceController();
const userOrdersController = new UserOrdersController();

const upload = multer(uploadConfig.multer);

ordersRouter.use(ensureAuthenticated);

ordersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      user_latitude: Joi.number().required(),
      user_longitude: Joi.number().required(),
      distance: Joi.number().required(),
    },
  }),
  ordersController.index,
);

ordersRouter.get(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.get(
  '/me/:status',
  celebrate({
    [Segments.PARAMS]: {
      status: Joi.number().required(),
    },
  }),
  userOrdersController.index,
);

// ordersRouter.get('/search', ordersController.showByKeys);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      deliveryman_id: Joi.string().optional(),
      requester_id: Joi.string().required(),
      pickup_date: Joi.date().required(),
      pickup_establishment: Joi.string().required(),
      pickup_address: Joi.string().required(),
      pickup_city: Joi.string().required(),
      pickup_state: Joi.string().required(),
      pickup_latitude: Joi.number().required(),
      pickup_longitude: Joi.number().required(),
      delivery_address: Joi.string().required(),
      delivery_city: Joi.string().required(),
      delivery_state: Joi.string().required(),
      delivery_latitude: Joi.number().required(),
      delivery_longitude: Joi.number().required(),
      trip_id: Joi.string().optional(),
      items: Joi.array()
        .items(
          Joi.object({
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
          }),
        )
        .required(),
    },
  }),
  ordersController.create,
);

ordersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      deliveryman_id: Joi.string().optional(),
      requester_id: Joi.string().required(),
      pickup_date: Joi.date().required(),
      pickup_establishment: Joi.string().required(),
      pickup_address: Joi.string().required(),
      pickup_city: Joi.string().required(),
      pickup_state: Joi.string().required(),
      pickup_latitude: Joi.number().required(),
      pickup_longitude: Joi.number().required(),
      delivery_address: Joi.string().required(),
      delivery_city: Joi.string().required(),
      delivery_state: Joi.string().required(),
      delivery_latitude: Joi.number().required(),
      delivery_longitude: Joi.number().required(),
      trip_id: Joi.string().optional(),
    },
  }),
  ordersController.update,
);

ordersRouter.patch(
  '/purchase_invoice',
  upload.single('purchase_invoice'),
  orderPurchaseInvoiceController.update,
);

export default ordersRouter;
