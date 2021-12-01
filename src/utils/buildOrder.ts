import { parse } from 'js2xmlparser';

const buildOrderPayload = (deal: any) => {
  if (!deal.person_id.name || !deal.person_id.email) {
    return null;
  }

  const order = {
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
