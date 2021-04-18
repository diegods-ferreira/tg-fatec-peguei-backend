import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import DeliverymanRatingController from '../controllers/DeliverymanRatingController';
import OrderRatingController from '../controllers/OrderRatingController';
import RatingController from '../controllers/RatingController';
import RequesterRatingController from '../controllers/RequesterRatingController';
import {
  rateCreationValidation,
  rateDeleteValidation,
  rateFindByOrderIdValidation,
  rateFindByRequesterIdValidation,
  rateUpdateValidation,
  rateFindByDeliverymanIdValidation,
} from '../middlewares/validations/request.validations';

const ratingRouter = Router();
const ratingController = new RatingController();
const orderRatingController = new OrderRatingController();
const requesterRatingController = new RequesterRatingController();
const deliverymanRatingController = new DeliverymanRatingController();

ratingRouter.use(ensureAuthenticated);

ratingRouter.post('/', rateCreationValidation, ratingController.create);

ratingRouter.put('/:id', rateUpdateValidation, ratingController.update);

ratingRouter.delete('/:id', rateDeleteValidation, ratingController.delete);

ratingRouter.get(
  '/order/:order_id',
  rateFindByOrderIdValidation,
  orderRatingController.index,
);

ratingRouter.get(
  '/requester/:requester_id',
  rateFindByRequesterIdValidation,
  requesterRatingController.index,
);

ratingRouter.get(
  '/deliveryman/:deliveryman_id',
  rateFindByDeliverymanIdValidation,
  deliverymanRatingController.index,
);

export default ratingRouter;
