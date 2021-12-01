import { v4 as uuidv4 } from 'uuid';
import DealsService, { IProviderDeal } from './dealsService';
import buildOrderPayload from '../../../utils/buildOrder';
import BlingApi from '../../../services/bling/api';
import messages from '../../../utils/messages';
import logger from '../../../utils/logger';
import Order from '../models/order';

interface IProviderOrder {
  numero: string,
  idPedido: number,
  idContato: number,
}
export default class OrdersService {
  private dealsService: DealsService;

  private blingApi: BlingApi;

  constructor() {
    this.dealsService = new DealsService();
    this.blingApi = new BlingApi();
  }

  // eslint-disable-next-line class-methods-use-this
  async getOrders() {
    return Order.find().sort([['processedAt', -1]]);
  }

  async createOrders() {
    const deals = await this.dealsService.getAllWonDeals();

    if (!deals) {
      logger.warn(`CreateOrders skip: ${messages.noWonDealsFound}`);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    let totalAmount = 0;
    const idList: Number[] = [];

    const currentOrder = await Order.findOne({ processedAt: `${today}T00:00:00.000Z` });

    await Promise.all(
      deals.map(async (deal: IProviderDeal) => {
        if (deal.status !== 'won' || deal.won_time.split(' ')[0] !== today
        || (currentOrder && currentOrder.providerIdList.some((id: number) => id === deal.id))) {
          return null;
        }

        const xml = buildOrderPayload(deal);
        if (!xml) {
          logger.error(`CreateOrder error: ${messages.createXmlError}`);
          return null;
        }

        const response = await this.blingApi.createOrder(xml);
        if (!response) {
          return null;
        }

        const providerOrder: IProviderOrder = response.data.retorno.pedidos
          ? response.data.retorno.pedidos[0].pedido : null;

        if (!providerOrder) {
          logger.error(`CreateOrder error: ${messages.createOrderError} ${deal.id}. Please, review the deal infos.`);
          return null;
        }

        totalAmount += deal.weighted_value;
        idList.push(deal.id);
        logger.info(`CreateOrder: ${messages.newOrderCreated}`);

        return providerOrder;
      }),
    );

    if (currentOrder) {
      await Order.updateOne(
        { _id: currentOrder.id },
        {
          totalAmount,
          providerIdList: currentOrder.providerIdList.concat(idList),
        },
      );
    } else {
      const order = new Order({
        _id: uuidv4(),
        title: `Wonned deals - ${today}`,
        totalAmount,
        processedAt: today,
        providerIdList: idList,
      });

      await order.save();
    }
  }
}
