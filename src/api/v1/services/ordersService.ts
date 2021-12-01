import createError from 'http-errors';
import DealsService from './dealsService';
import buildOrderPayload from '../../../utils/buildOrder';
import BlingApi from '../../../services/bling/api';
import messages from '../../../utils/messages';
import logger from '../../../utils/logger';

class OrdersService {
  private dealsService: DealsService;

  private blingApi: BlingApi;

  constructor() {
    this.dealsService = new DealsService();
    this.blingApi = new BlingApi();
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
          throw createError(400, messages.createXmlError);
        }

        console.log(xml);
        const response = await this.blingApi.createOrder(xml);
        console.log('erro:', response.data.retorno.erros[0]);
        // console.log('pedido', response.data.retorno);
      }),
    );

    return deals;
  }
}

export default new OrdersService();
