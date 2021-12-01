import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import OrderServices from '../services/ordersService';

class OrdersController {
  // eslint-disable-next-line class-methods-use-this
  async createOrders(req: Request, res: Response) {
    try {
      const deals = await OrderServices.createOrders();

      return res.status(200).send({
        data: deals,
      });
    } catch (err:any) {
      logger.error(err);
      return res.status(500).send({
        error: err,
      });
    }
  }
}

export default new OrdersController();
