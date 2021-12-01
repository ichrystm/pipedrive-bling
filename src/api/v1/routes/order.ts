import { Router } from 'express';
import orderController from '../controllers/orderController';

const ordersRouter = Router();

ordersRouter.post('/', orderController.createOrders);

export default ordersRouter;
