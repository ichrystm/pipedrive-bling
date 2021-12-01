import PipedriveApi from '../../../services/pipedrive/api';

export default class DealsService {
  private pipedriveApi: PipedriveApi;

  constructor() {
    this.pipedriveApi = new PipedriveApi();
  }

  async getAllWonDeals() {
    const response = await this.pipedriveApi.getAllWonDeals();
    return response.data.data;
  }
}