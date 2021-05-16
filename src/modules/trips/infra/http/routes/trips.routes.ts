import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import TripOrdersController from '../controllers/TripOrdersController';
import TripsController from '../controllers/TripsController';
import UserTripsController from '../controllers/UserTripsController';
import {
  tripCreationValidation,
  tripDetailsSearchValidation,
  tripsListSearchValidation,
  tripUpdateValidation,
  tripOrdersSearchValidation,
} from '../middlewares/validation/request.validations';

const tripsRouter = Router();
const tripsController = new TripsController();
const userTripsController = new UserTripsController();
const tripOrdersController = new TripOrdersController();

tripsRouter.use(ensureAuthenticated);

tripsRouter.get('/', tripsListSearchValidation, tripsController.index);

tripsRouter.get('/me', userTripsController.index);

tripsRouter.get('/:trip_id', tripDetailsSearchValidation, tripsController.show);

tripsRouter.get(
  '/:trip_id/orders',
  tripOrdersSearchValidation,
  tripOrdersController.show,
);

tripsRouter.post('/', tripCreationValidation, tripsController.create);

tripsRouter.put('/:id', tripUpdateValidation, tripsController.update);

export default tripsRouter;
