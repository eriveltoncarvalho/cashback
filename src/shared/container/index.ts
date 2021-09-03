import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IsalesRepository from '@modules/sales/repositories/ISalesRepository';
import SalesRepository from '@modules/sales/infra/typeorm/repositories/SalesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<IsalesRepository> (
  'SalesRepository',
   SalesRepository
);

container.registerSingleton<IUsersRepository> (
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository> (
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<IProductsRepository> (
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<ICustomersRepository> (
  'CustomersRepository',
  CustomersRepository
);

