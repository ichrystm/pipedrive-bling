import { Router } from 'express';
import OrdersController from '../controllers/ordersController';

const ordersRouter = Router();

ordersRouter.get('/', OrdersController.getOrders);

export default ordersRouter;
