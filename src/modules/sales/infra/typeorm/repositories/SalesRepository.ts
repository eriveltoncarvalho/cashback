import { getRepository, Repository } from 'typeorm';

import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';
import Sale from '../entities/Sale';

class SalesRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async create({
    users_id,
    customer,
    products,
    status,
    total,
    cashback_percentage,
    cashback_value
  }: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create({
      users_id,
      customer,
      sales_items: products,
      status,
      total,
      cashback_percentage,
      cashback_value
    });

    await this.ormRepository.save(sale);

    return sale;
  }

  public async findById(id: string): Promise<Sale | undefined> {
    const sale = this.ormRepository.findOne(id, {
      relations: ['sales_items', 'customer'],
    });

    return sale;
  }
}

export default SalesRepository;
