import PipedriveApi from '../../../services/pipedrive/api';

interface IProviderEmail {
  label?: string,
  value: string,
  primary: boolean,
}
interface IProviderPerson {
  name: string,
  email: IProviderEmail[]
}
export interface IProviderDeal {
  id: number,
  status: string,
  title: string,
  won_time: string,
  weighted_value: number
  person_id: IProviderPerson
}

export default class DealsService {
  private pipedriveApi: PipedriveApi;

  constructor() {
    this.pipedriveApi = new PipedriveApi();
  }

  async getAllWonDeals(): Promise<IProviderDeal[]> {
    const response = await this.pipedriveApi.getAllWonDeals();
    if (!response) {
      return [];
    }
    return response.data.data as IProviderDeal[];
  }
}
