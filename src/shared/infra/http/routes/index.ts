import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import unitsMeasureRouter from '@modules/units_measure/infra/http/routes/units_measure.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/categories', categoriesRouter);
routes.use('/units_measure', unitsMeasureRouter);

export default routes;
