import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import SalesItems from './SaleItem';

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  users_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'users_id'})
  user: User;

  @Column()
  customers_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customers_id'})
  customer: Customer;

  @OneToMany(() => SalesItems, sales_items => sales_items.sale, {
    cascade: true,
  })
  sales_items: SalesItems[];

  @Column()
  status: string;

  @Column('decimal')
  total: number;

  @Column('decimal')
  cashback_percentage: number;

  @Column('decimal')
  cashback_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sale;
