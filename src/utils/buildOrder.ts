import { parse } from 'js2xmlparser';
import { IProviderDeal } from '../api/v1/services/dealsService';

interface IClientPaylod {
  nome: string,
  tipoPessoa: string,
  email: string,
}

interface IItemPayload {
  codigo: number,
  descricao: string,
  un: string,
  qtde: number,
  vlr_unit: number,
}

interface IItemsPayload {
  item: IItemPayload
}

interface IRequestPaylod {
  cliente: IClientPaylod,
  itens: IItemsPayload[]
}
interface IOrderPayload {
  pedido: IRequestPaylod
}

const buildOrderPayload = (deal: IProviderDeal): string | null => {
  if (!deal.person_id.name || !deal.person_id.email) {
    return null;
  }

  const order: IOrderPayload = {
    pedido: {
      cliente: {
        nome: deal.person_id.name,
        tipoPessoa: 'J',
        email: deal.person_id.email ? deal.person_id.email[0].value : '',
      },
      itens: [
        {
          item: {
            codigo: deal.id,
            descricao: deal.title,
            un: 'un',
            qtde: 1,
            vlr_unit: deal.weighted_value,
          },
        },
      ],
    },
  };

  return parse('raiz', order, { declaration: { encoding: 'UTF-8' } });
};

export default buildOrderPayload;
