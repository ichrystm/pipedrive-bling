import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import OrdersService from '../services/ordersService';

class OrdersController {
  // eslint-disable-next-line class-methods-use-this
  async getOrders(req: Request, res: Response): Promise<Response> {
    try {
      const ordersServices = new OrdersService();
      const orders = await ordersServices.getOrders();

      return res.status(200).send({
        orders,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).send({
        error: err,
      });
    }
  }
}

export default new OrdersController();
