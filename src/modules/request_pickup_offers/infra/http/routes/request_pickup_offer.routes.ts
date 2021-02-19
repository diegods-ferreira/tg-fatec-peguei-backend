import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import RequestPickupOfferController from '../controllers/RequestPickupOfferController';
import {
  requestPickupOfferCreationValidation,
  requestPickupOfferDeleteValidation,
  requestPickupOfferDeliverymanSearchValidation,
  requestPickupOfferOrderSearchValidation,
  requestPickupOfferUpdateValidation,
} from '../middlewares/validations/request.validations';

const requestPickupOffersRouter = Router();
const requestPickupOfferController = new RequestPickupOfferController();

requestPickupOffersRouter.use(ensureAuthenticated);

requestPickupOffersRouter.post(
  '/:order_id',
  requestPickupOfferCreationValidation,
  requestPickupOfferController.create,
);

requestPickupOffersRouter.get(
  '/:order_id/deliveryman/:deliveryman_id',
  requestPickupOfferDeliverymanSearchValidation,
  requestPickupOfferController.show,
);

requestPickupOffersRouter.get(
  '/:order_id',
  requestPickupOfferOrderSearchValidation,
  requestPickupOfferController.index,
);

requestPickupOffersRouter.delete(
  '/:id',
  requestPickupOfferDeleteValidation,
  requestPickupOfferController.delete,
);

requestPickupOffersRouter.put(
  '/:id',
  requestPickupOfferUpdateValidation,
  requestPickupOfferController.update,
);

export default requestPickupOffersRouter;
