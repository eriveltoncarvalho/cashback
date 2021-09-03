import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSales1630519811959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'users_id',
            type: 'uuid',
          },
          {
            name: 'customers_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['VALIDACAO', 'APROVADO'],
            enumName: 'statusEnum'
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'cashback_percentage',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'cashback_value',
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
            name: 'SalesUsers',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['users_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SalesCostumers',
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customers_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
