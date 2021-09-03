import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

import Sale from './Sale'
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('sales_items')
class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sale, sale => sale.sales_items)
  @JoinColumn({ name: 'sales_id' })
  sale: Sale;

  @ManyToOne(() => Product, product => product.sales_items)
  @JoinColumn({ name: 'products_id' })
  product: Product;

  @Column()
  products_id: string;

  @Column()
  sales_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  value_total_item: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SaleItem;
