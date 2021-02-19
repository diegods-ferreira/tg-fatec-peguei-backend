import { celebrate, Joi, Segments } from 'celebrate';

const tripsListSearchValidation = celebrate({
  [Segments.QUERY]: {
    user_latitude: Joi.number().required(),
    user_longitude: Joi.number().required(),
    distance: Joi.number().required(),
    page: Joi.number().optional(),
  },
});

const tripDetailsSearchValidation = celebrate({
  [Segments.PARAMS]: {
    trip_id: Joi.string().required(),
  },
});

const tripCreationValidation = celebrate({
  [Segments.BODY]: {
    destination: Joi.string().required(),
    return_location: Joi.string().required(),
    destination_latitude: Joi.number().required(),
    destination_longitude: Joi.number().required(),
    departure_date: Joi.date().required(),
    return_date: Joi.date().required(),
  },
});

const tripUpdateValidation = celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    destination: Joi.string().required(),
    return_location: Joi.string().required(),
    destination_latitude: Joi.number().required(),
    destination_longitude: Joi.number().required(),
    departure_date: Joi.date().required(),
    return_date: Joi.date().required(),
  },
});

export {
  tripsListSearchValidation,
  tripDetailsSearchValidation,
  tripCreationValidation,
  tripUpdateValidation,
};
