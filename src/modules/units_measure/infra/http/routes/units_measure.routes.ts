import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import UnitsMeasureController from '../controllers/UnitsMeasureController';
import unitsMeasureSearchValidation from '../middlewares/validations/request.validations';

const unitsMeasureRouter = Router();
const unitsMeasureController = new UnitsMeasureController();

unitsMeasureRouter.use(ensureAuthenticated);

unitsMeasureRouter.get('/', unitsMeasureController.index);

unitsMeasureRouter.get('/search', unitsMeasureController.showByDescription);

unitsMeasureRouter.get(
  '/type/:unit_measure_type',
  unitsMeasureSearchValidation,
  unitsMeasureController.showByType,
);

export default unitsMeasureRouter;
