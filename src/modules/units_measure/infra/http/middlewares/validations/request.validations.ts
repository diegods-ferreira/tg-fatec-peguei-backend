import { celebrate, Joi, Segments } from 'celebrate';

const unitsMeasureSearchValidation = celebrate({
  [Segments.PARAMS]: {
    unit_measure_type: Joi.number().required(),
  },
});

export default unitsMeasureSearchValidation;
