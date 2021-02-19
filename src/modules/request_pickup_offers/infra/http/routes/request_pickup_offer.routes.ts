import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import RequestPickupOfferController from '../controllers/RequestPickupOfferController';

const requestPickupOffersRouter = Router();
const requestPickupOfferController = new RequestPickupOfferController();

requestPickupOffersRouter.use(ensureAuthenticated);

requestPickupOffersRouter.post(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      delivery_value: Joi.number().required(),
    },
  }),
  requestPickupOfferController.create,
);

requestPickupOffersRouter.get(
  '/:order_id/deliveryman/:deliveryman_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().required(),
      deliveryman_id: Joi.string().required(),
    },
  }),
  requestPickupOfferController.show,
);

requestPickupOffersRouter.get(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().required(),
    },
  }),
  requestPickupOfferController.index,
);

requestPickupOffersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  requestPickupOfferController.delete,
);

requestPickupOffersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  requestPickupOfferController.update,
);

export default requestPickupOffersRouter;
