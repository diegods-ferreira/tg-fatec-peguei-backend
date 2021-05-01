import { celebrate, Joi, Segments } from 'celebrate';

const tripsListSearchValidation = celebrate({
  [Segments.QUERY]: {
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
    destination_city: Joi.string().required(),
    destination_state: Joi.string().required(),
    return_city: Joi.string().required(),
    return_state: Joi.string().required(),
    departure_date: Joi.date().required(),
    return_date: Joi.date().required(),
  },
});

const tripUpdateValidation = celebrate({
  [Segments.BODY]: {
    destination_city: Joi.string().required(),
    destination_state: Joi.string().required(),
    return_city: Joi.string().required(),
    return_state: Joi.string().required(),
    departure_date: Joi.date().required(),
    return_date: Joi.date().required(),
    status: Joi.number().required(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export {
  tripsListSearchValidation,
  tripDetailsSearchValidation,
  tripCreationValidation,
  tripUpdateValidation,
};
