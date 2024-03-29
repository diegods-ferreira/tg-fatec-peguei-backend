import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import unitsMeasureRouter from '@modules/units_measure/infra/http/routes/units_measure.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import itemsRouter from '@modules/orders/infra/http/routes/items.routes';
import tripsRouter from '@modules/trips/infra/http/routes/trips.routes';
import chatsRouter from '@modules/chats/infra/http/routes/chats.routes';
import ratingRouter from '@modules/rating/infra/http/routes/rating.routes';
import seedsRouter from 'seeds/routes/seeds.routes';
import CacheController from '../controllers/CacheController';

const routes = Router();
const cacheController = new CacheController();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/categories', categoriesRouter);
routes.use('/units_measure', unitsMeasureRouter);
routes.use('/orders', ordersRouter);
routes.use('/items', itemsRouter);
routes.use('/trips', tripsRouter);
routes.use('/chats', chatsRouter);
routes.use('/rating', ratingRouter);
routes.get('/clear-cache', cacheController.clear);
routes.use('/seed', seedsRouter);

export default routes;
