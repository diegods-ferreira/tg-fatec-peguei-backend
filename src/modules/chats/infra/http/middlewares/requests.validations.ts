import { celebrate, Joi, Segments } from 'celebrate';

const chatsSearchValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

const chatsCreationValidation = celebrate({
  [Segments.BODY]: {
    order_id: Joi.string().required(),
    deliveryman_id: Joi.string().required(),
    requester_id: Joi.string().required(),
  },
});

const chatPreviousMessagesSearchValidation = celebrate({
  [Segments.PARAMS]: {
    chat_id: Joi.string().required(),
  },
});

export {
  chatsSearchValidation,
  chatsCreationValidation,
  chatPreviousMessagesSearchValidation,
};
