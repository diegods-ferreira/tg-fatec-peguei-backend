import { celebrate, Joi, Segments } from 'celebrate';

const rateCreationValidation = celebrate({
  [Segments.BODY]: {
    order_id: Joi.string().required(),
    requester_id: Joi.string().required(),
    deliveryman_id: Joi.string().required(),
    rate: Joi.number().required(),
    comment: Joi.string().required(),
  },
});

const rateUpdateValidation = celebrate({
  [Segments.BODY]: {
    rate: Joi.number().required(),
    comment: Joi.string().required(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

const rateDeleteValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

const rateFindByOrderIdValidation = celebrate({
  [Segments.PARAMS]: {
    order_id: Joi.string().required(),
  },
});

const rateFindByRequesterIdValidation = celebrate({
  [Segments.PARAMS]: {
    requester_id: Joi.string().required(),
  },
});

const rateFindByDeliverymanIdValidation = celebrate({
  [Segments.PARAMS]: {
    deliveryman_id: Joi.string().required(),
  },
});

export {
  rateCreationValidation,
  rateUpdateValidation,
  rateDeleteValidation,
  rateFindByOrderIdValidation,
  rateFindByRequesterIdValidation,
  rateFindByDeliverymanIdValidation,
};
