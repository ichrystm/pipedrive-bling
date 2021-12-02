import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Config from '../../config';
import logger from '../../utils/logger';

export default class PipedriveApi {
  private apiToken: string;

  private pipedriveApi: AxiosInstance;

  constructor() {
    this.apiToken = Config.pipedriveApiToken;
    this.pipedriveApi = axios.create({
      baseURL: Config.pipedriveApiUrl,
    });
  }

  public async getAllWonDeals(): Promise<AxiosResponse | null> {
    const response = this.pipedriveApi.get(`/deals?status=won&api_token=${this.apiToken}`)
      .catch((err) => {
        logger.error(`PipeDriveApi error: ${err.response.data}`);
        return null;
      });
    return response;
  }
}
