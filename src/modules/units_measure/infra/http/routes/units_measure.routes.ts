import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UnitsMeasureController from '../controllers/UnitsMeasureController';

const unitsMeasureRouter = Router();
const unitsMeasureController = new UnitsMeasureController();

unitsMeasureRouter.use(ensureAuthenticated);

unitsMeasureRouter.get('/', unitsMeasureController.index);

unitsMeasureRouter.get('/search', unitsMeasureController.showByDescription);

unitsMeasureRouter.get(
  '/type/:unit_measure_type',
  celebrate({
    [Segments.PARAMS]: {
      unit_measure_type: Joi.number().required(),
    },
  }),
  unitsMeasureController.showByType,
);

export default unitsMeasureRouter;
