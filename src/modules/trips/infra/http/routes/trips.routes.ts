import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TripsController from '../controllers/TripsController';
import UserTripsController from '../controllers/UserTripsController';

const tripsRouter = Router();
const tripsController = new TripsController();
const userTripsController = new UserTripsController();

tripsRouter.use(ensureAuthenticated);

tripsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      user_latitude: Joi.number().required(),
      user_longitude: Joi.number().required(),
      distance: Joi.number().required(),
      page: Joi.number().optional(),
      date: Joi.date().required(),
    },
  }),
  tripsController.index,
);

tripsRouter.get('/me', userTripsController.index);

tripsRouter.get(
  '/:trip_id',
  celebrate({
    [Segments.PARAMS]: {
      trip_id: Joi.string().required(),
    },
  }),
  tripsController.show,
);

tripsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      destination: Joi.string().required(),
      return_location: Joi.string().required(),
      destination_latitude: Joi.number().required(),
      destination_longitude: Joi.number().required(),
      departure_date: Joi.date().required(),
      return_date: Joi.date().required(),
    },
  }),
  tripsController.create,
);

tripsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      destination: Joi.string().required(),
      return_location: Joi.string().required(),
      destination_latitude: Joi.number().required(),
      destination_longitude: Joi.number().required(),
      departure_date: Joi.date().required(),
      return_date: Joi.date().required(),
    },
  }),
  tripsController.update,
);

export default tripsRouter;
