import { Router } from 'express';
import ordersController from '../controllers/ordersController';

const ordersRouter = Router();

ordersRouter.post('/', ordersController.createOrders);

export default ordersRouter;
