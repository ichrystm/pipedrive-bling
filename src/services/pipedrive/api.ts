import axios, { AxiosInstance } from 'axios';
import Config from '../../config';

export default class PipedriveApi {
  private apiToken: string;

  private pipedriveApi: AxiosInstance;

  constructor() {
    this.apiToken = Config.pipedriveApiToken;
    this.pipedriveApi = axios.create({
      baseURL: Config.pipedriveApiUrl,
    });
  }

  public async getAllWonDeals() {
    return this.pipedriveApi.get(`/deals?status=won&api_token=${this.apiToken}`);
  }
}
