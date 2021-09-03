import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, cpf, email }: IRequest): Promise<Customer> {
    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('This e-mail is already assigned to a customer');
    }

    const checkCpfUserExists = await this.customersRepository.findByCpf(cpf);

    if (checkCpfUserExists) {
      throw new AppError('Cpf already used.')
    }

    const customer = await this.customersRepository.create({ name, cpf, email });

    return customer;
  }
}

export default CreateCustomerService;
