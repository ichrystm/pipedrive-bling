import { CronJob } from 'cron';
import OrdersService from '../api/v1/services/ordersService';
import logger from '../utils/logger';
import messages from '../utils/messages';

class BlingJob {
  ordersServices: OrdersService;

  constructor() {
    this.ordersServices = new OrdersService();
  }

  async job(): Promise<void> {
    return new CronJob('0 * * * * *', async () => {
      logger.info(messages.blingJobRunning);
      await this.ordersServices.createOrders();
      logger.info(messages.blingJobFinished);
    }).start();
  }
}

export default new BlingJob().job();
