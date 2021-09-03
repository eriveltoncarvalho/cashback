import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSalesItem1630519845060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sales_id',
            type: 'uuid',
          },
          {
            name: 'products_id',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'value_total_item',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'SalesItems_Sales',
            referencedTableName: 'sales',
            referencedColumnNames: ['id'],
            columnNames: ['sales_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SalesItems_Products',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['products_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales_items');
  }
}
