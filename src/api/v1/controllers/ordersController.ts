// import { Request, Response } from 'express';
// import logger from '../../../utils/logger';
// import OrdersService from '../services/ordersService';

// class OrdersController {
//   ordersServices: OrdersService;

//   constructor() {
//     this.ordersServices = new OrdersService();
//   }

//   async createOrders(req: Request, res: Response) {
//     try {
//       const deals = await this.ordersServices.createOrders();

//       return res.status(200).send({
//         data: deals,
//       });
//     } catch (err:any) {
//       logger.error(err);
//       return res.status(500).send({
//         error: err,
//       });
//     }
//   }
// }

// export default new OrdersController();
