import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Config from '../../config';
import logger from '../../utils/logger';

export default class BlingApi {
  private apiToken: string;

  private blingApi: AxiosInstance;

  constructor() {
    this.apiToken = Config.blingApiToken;
    this.blingApi = axios.create({
      baseURL: Config.blingApiUrl,
    });
  }

  public async createOrder(xml: string): Promise<AxiosResponse | null> {
    const response = this.blingApi.post(`/pedido/json?apikey=${this.apiToken}&xml=${xml}`)
      .catch((err) => {
        logger.error(`BlingApi error: ${err.response.data.retorno.erros.erro.msg}`);
        return null;
      });

    return response;
  }
}
