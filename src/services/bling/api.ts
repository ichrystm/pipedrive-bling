import axios, { AxiosInstance } from 'axios';
import Config from '../../config';

export default class BlingApi {
  private apiToken: string;

  private blingApi: AxiosInstance;

  constructor() {
    this.apiToken = Config.blingApiToken;
    this.blingApi = axios.create({
      baseURL: Config.blingApiUrl,
    });
  }

  public async createOrder(xml: string) {
    return this.blingApi.post(`/pedido/json?apikey=${this.apiToken}&xml=${xml}`);
  }
}
