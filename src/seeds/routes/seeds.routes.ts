import { Router } from 'express';
import SeedsController from 'seeds/controllers/SeedsController';

const seedsRouter = Router();
const seedsController = new SeedsController();

seedsRouter.post('/', seedsController.create);

export default seedsRouter;
