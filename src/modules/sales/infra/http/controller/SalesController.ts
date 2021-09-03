import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateSaleService from '@modules/sales/services/CreateSaleService';
import FindSaleService from '@modules/sales/services/FindSaleService';

export default class SalesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findSale = container.resolve(FindSaleService);

    const sale = await findSale.execute({
      id,
    });

    return response.json(sale);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { users_id, customers_id, products } = request.body;

    const createSale = container.resolve(CreateSaleService);

    console.log('constroller :'+users_id)
    const customer = await createSale.execute({
      users_id,
      customers_id,
      products,
    });

    return response.json(customer);
  }
}
