import { celebrate, Joi, Segments } from 'celebrate';

const requestPickupOfferCreationValidation = celebrate({
  [Segments.PARAMS]: {
    order_id: Joi.string().required(),
  },
  [Segments.BODY]: {
    delivery_value: Joi.number().required(),
  },
});

const requestPickupOfferDeliverymanSearchValidation = celebrate({
  [Segments.PARAMS]: {
    order_id: Joi.string().required(),
    deliveryman_id: Joi.string().required(),
  },
});

const requestPickupOfferOrderSearchValidation = celebrate({
  [Segments.PARAMS]: {
    order_id: Joi.string().required(),
  },
});

const requestPickupOfferDeleteValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

const requestPickupOfferUpdateValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
  [Segments.BODY]: {
    delivery_value: Joi.number().required(),
  },
});

export {
  requestPickupOfferCreationValidation,
  requestPickupOfferDeliverymanSearchValidation,
  requestPickupOfferOrderSearchValidation,
  requestPickupOfferDeleteValidation,
  requestPickupOfferUpdateValidation,
};
