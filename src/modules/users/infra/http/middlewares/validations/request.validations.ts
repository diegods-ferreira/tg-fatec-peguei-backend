import { celebrate, Segments, Joi } from 'celebrate';

const userCreationValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    username: Joi.string().required().min(5).max(15),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  },
});

const sessionCreationValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

const profileUpdateValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    presentation: Joi.string().allow(null, ''),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    phone: Joi.string().required(),
    whatsapp: Joi.string().allow(null, ''),
    telegram: Joi.string().allow(null, ''),
    show_email: Joi.boolean().required(),
    show_whatsapp: Joi.boolean().required(),
    show_telegram: Joi.boolean().required(),
    show_phone: Joi.boolean().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  },
});

const forgotPasswordEmailValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

const resetPasswordValidation = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

export {
  userCreationValidation,
  sessionCreationValidation,
  profileUpdateValidation,
  forgotPasswordEmailValidation,
  resetPasswordValidation,
};
