import DealsService from './dealsService';
import buildOrderPayload from '../../../utils/buildOrder';
import BlingApi from '../../../services/bling/api';
import messages from '../../../utils/messages';
import logger from '../../../utils/logger';
import Order from '../models/order';

export default class OrdersService {
  private dealsService: DealsService;

  private blingApi: BlingApi;

  constructor() {
    this.dealsService = new DealsService();
    this.blingApi = new BlingApi();
  }

  // eslint-disable-next-line class-methods-use-this
  async getOrders() {
    return Order.find();
  }

  async createOrders() {
    const deals = await this.dealsService.getAllWonDeals();

    await Promise.all(
      deals.map(async (deal: any) => {
        // find duplicity in db

        // if not
        const xml = buildOrderPayload(deal);
        if (!xml) {
          logger.error(`CreateOrder error: ${messages.createXmlError}`);
          return null;
        }

        const response = await this.blingApi.createOrder(xml);
        return response.data.retorno.pedidos;
      }),
    );
  }
}
