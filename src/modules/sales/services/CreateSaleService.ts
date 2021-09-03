import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Sale from '../infra/typeorm/entities/Sale';
import ISalesRepository from '../repositories/ISalesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  users_id: string;
  customers_id: string;
  products: IProduct[];
}

@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({users_id ,customers_id, products }: IRequest): Promise<Sale> {
    const customerExists = await this.customersRepository.findById(customers_id);
    const userExists = await this.usersRepository.findById(users_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const existentProducts = await this.productsRepository.findAllById(
      products,
    );

    if (!existentProducts.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existentProductsIds = existentProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      );
    }

    const findProductWithNoQuanttyAvailable = products.filter(
      product =>
        existentProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductWithNoQuanttyAvailable.length) {
      throw new AppError(
        `The quantity ${findProductWithNoQuanttyAvailable[0].quantity} is not available for ${findProductWithNoQuanttyAvailable[0].id}`,
      );
    }

    const serializeProducts = products.map(product => ({
      products_id: product.id,
      quantity: product.quantity,
      price: existentProducts.filter(p => p.id === product.id)[0].price,
      value_total_item: (product.quantity * existentProducts.filter(p => p.id === product.id)[0].price)
    }));

    const type = userExists?.type;
    const status =  (type=='GERENTE') ? 'APROVADO' : 'VALIDACAO';

    let totalItem = 0;
    let cashbackPercentage = 0;
    let cashbackValue = 0;

    totalItem = serializeProducts[0].value_total_item;

    if (totalItem <= 1000) {
      cashbackPercentage = 10;
    } else if ((totalItem > 1000) && (totalItem <= 1500)) {
      cashbackPercentage = 15;
    } else {
      cashbackPercentage = 20;
    }

    cashbackValue = ((totalItem * cashbackPercentage) / 100);

    const sale = await this.salesRepository.create({
      users_id,
      customer: customerExists,
      products: serializeProducts,
      status: status,
      total: totalItem,
      cashback_percentage: cashbackPercentage,
      cashback_value: cashbackValue
    });

    const { sales_items } = sale;

    const saleProductsQuantity = sales_items.map(product => ({
      id: product.products_id,
      quantity:
        existentProducts.filter(p => p.id === product.products_id)[0].quantity -
        product.quantity
    }));

    await this.productsRepository.updateQuantity(saleProductsQuantity);

    return sale;
  }
}

export default CreateSaleService;
