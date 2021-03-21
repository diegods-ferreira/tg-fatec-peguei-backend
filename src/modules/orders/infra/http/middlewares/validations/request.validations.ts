import { celebrate, Joi, Segments } from 'celebrate';

const orderSearchValidation = celebrate({
  [Segments.QUERY]: {
    user_latitude: Joi.number().required(),
    user_longitude: Joi.number().required(),
    distance: Joi.number().required(),
    page: Joi.number().optional(),
  },
});

const orderDetailsSearchValidation = celebrate({
  [Segments.PARAMS]: {
    order_id: Joi.string().required(),
  },
});

const orderCreationValidation = celebrate({
  [Segments.BODY]: {
    deliveryman_id: Joi.string().optional(),
    pickup_date: Joi.date().required(),
    pickup_establishment: Joi.string().required(),
    pickup_address: Joi.string().required(),
    pickup_city: Joi.string().required(),
    pickup_state: Joi.string().required(),
    pickup_latitude: Joi.number().required(),
    pickup_longitude: Joi.number().required(),
    delivery_address: Joi.string().required(),
    delivery_city: Joi.string().required(),
    delivery_state: Joi.string().required(),
    delivery_latitude: Joi.number().required(),
    delivery_longitude: Joi.number().required(),
    trip_id: Joi.string().optional(),
    items: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          quantity: Joi.number().required(),
          weight: Joi.number().required(),
          width: Joi.number().required(),
          height: Joi.number().required(),
          depth: Joi.number().required(),
          packing: Joi.string().required(),
          category_id: Joi.number().required(),
          weight_unit_id: Joi.number().required(),
          dimension_unit_id: Joi.number().required(),
          description: Joi.string().required(),
        }),
      )
      .required(),
  },
});

const orderUpdateValidation = celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    deliveryman_id: Joi.string().optional(),
    requester_id: Joi.string().required(),
    pickup_date: Joi.date().required(),
    pickup_establishment: Joi.string().required(),
    pickup_address: Joi.string().required(),
    pickup_city: Joi.string().required(),
    pickup_state: Joi.string().required(),
    pickup_latitude: Joi.number().required(),
    pickup_longitude: Joi.number().required(),
    delivery_address: Joi.string().required(),
    delivery_city: Joi.string().required(),
    delivery_state: Joi.string().required(),
    delivery_latitude: Joi.number().required(),
    delivery_longitude: Joi.number().required(),
    trip_id: Joi.string().optional(),
  },
});

const orderDeliverymanUpdateValidation = celebrate({
  [Segments.BODY]: {
    deliveryman_id: Joi.string().required(),
  },
});

const orderDeleteValidation = celebrate({
  [Segments.PARAMS]: {
    order_id: Joi.string().required(),
  },
});

const itemSearchValidation = celebrate({
  [Segments.PARAMS]: {
    item_id: Joi.string().required(),
  },
});

const itemUpdateValidation = celebrate({
  [Segments.BODY]: {
    id: Joi.string().required().uuid(),
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    weight: Joi.number().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
    depth: Joi.number().required(),
    packing: Joi.string().required(),
    category_id: Joi.number().required(),
    weight_unit_id: Joi.number().required(),
    dimension_unit_id: Joi.number().required(),
    description: Joi.string().required(),
  },
});

export {
  orderSearchValidation,
  orderDetailsSearchValidation,
  orderCreationValidation,
  orderUpdateValidation,
  orderDeliverymanUpdateValidation,
  orderDeleteValidation,
  itemSearchValidation,
  itemUpdateValidation,
};
