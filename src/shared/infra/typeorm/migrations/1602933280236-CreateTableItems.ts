import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableItems1602933280236
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'weight',
            type: 'decimal',
            scale: 2,
            precision: 10,
          },
          {
            name: 'width',
            type: 'decimal',
            scale: 2,
            precision: 10,
          },
          {
            name: 'height',
            type: 'decimal',
            scale: 2,
            precision: 10,
          },
          {
            name: 'depth',
            type: 'decimal',
            scale: 2,
            precision: 10,
          },
          {
            name: 'packing',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'integer',
          },
          {
            name: 'weight_unit_id',
            type: 'integer',
          },
          {
            name: 'dimension_unit_id',
            type: 'integer',
          },
          {
            name: 'description',
            type: 'varchar',
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
      }),
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        name: 'pk_order_id',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        name: 'pk_category_id',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        name: 'pk_weight_unit_id',
        columnNames: ['weight_unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'units_measure',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        name: 'pk_dimension_unit_id',
        columnNames: ['dimension_unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'units_measure',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('items', 'pk_order_id');
    await queryRunner.dropForeignKey('items', 'pk_category_id');
    await queryRunner.dropForeignKey('items', 'pk_weight_unit_id');
    await queryRunner.dropForeignKey('items', 'pk_dimension_unit_id');

    await queryRunner.dropTable('items');
  }
}
