import { inject, injectable } from 'tsyringe';

import Sale from '../infra/typeorm/entities/Sale';
import ISalesRepository from '../repositories/ISalesRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindSalesService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Sale | undefined> {
    const sale = await this.salesRepository.findById(id);

    return sale;
  }
}

export default FindSalesService;
