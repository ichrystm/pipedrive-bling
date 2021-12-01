import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import OrdersService from '../services/ordersService';

class OrdersController {
  // private ordersServices: OrdersService;

  // constructor() {
  //   this.ordersServices = new OrdersService();
  // }

  // eslint-disable-next-line class-methods-use-this
  async getOrders(req: Request, res: Response) {
    try {
      const ordersServices = new OrdersService();
      const orders = await ordersServices.getOrders();

      return res.status(200).send({
        orders,
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
