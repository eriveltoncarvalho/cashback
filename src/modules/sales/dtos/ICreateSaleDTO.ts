import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface IProduct {
  products_id: string;
  price: number;
  quantity: number;
  value_total_item: number;
}

export default interface ICreateSaleDTO {
  users_id: string;
  customer: Customer;
  products: IProduct[];
  status: string;
  total: number;
  cashback_percentage: number;
  cashback_value: number;
}
