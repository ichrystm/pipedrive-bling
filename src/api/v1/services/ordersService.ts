import { v4 as uuidv4 } from 'uuid';
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
    return Order.find().sort([['wonnedAt', -1]]);
  }

  async createOrders() {
    const deals = await this.dealsService.getAllWonDeals();

    if (!deals) {
      logger.warn(`CreateOrders skip: ${messages.noWonDealsFound}`);
      return;
    }

    await Promise.all(
      deals.map(async (deal: any) => {
        const currentOrder = await Order.findOne({ code: deal.id });
        if (currentOrder) {
          logger.warn(`CreateOrder skip: ${messages.orderDuplicity} ${deal.id}`);
          return null;
        }

        const xml = buildOrderPayload(deal);
        if (!xml) {
          logger.error(`CreateOrder error: ${messages.createXmlError}`);
          return null;
        }

        const response = await this.blingApi.createOrder(xml);
        const providerOrder = response.data.retorno.pedidos
          ? response.data.retorno.pedidos[0].pedido : null;

        if (!providerOrder) {
          logger.error(`CreateOrder error: ${messages.createOrderError} ${deal.id}`);
          return null;
        }

        const order = new Order({
          _id: uuidv4(),
          orderId: providerOrder.idPedido,
          contactId: providerOrder.idContato,
          code: deal.id,
          quantity: 1,
          unitValue: deal.weighted_value,
          wonnedAt: new Date(deal.won_time),
        });

        await order.save();

        return providerOrder;
      }),
    );
  }
}
