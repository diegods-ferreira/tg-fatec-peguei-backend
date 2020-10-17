import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableOrders1602931813296
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'deliveryman_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'requester_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'pickup_date',
            type: 'timestamp',
          },
          {
            name: 'pickup_establishment',
            type: 'varchar',
          },
          {
            name: 'pickup_address',
            type: 'varchar',
          },
          {
            name: 'pickup_city',
            type: 'varchar',
          },
          {
            name: 'pickup_state',
            type: 'varchar',
          },
          {
            name: 'delivery_address',
            type: 'varchar',
          },
          {
            name: 'delivery_city',
            type: 'varchar',
          },
          {
            name: 'delivery_state',
            type: 'varchar',
          },
          {
            name: 'delivery_value',
            type: 'decimal',
            scale: 2,
            precision: 10,
          },
          {
            name: 'purchase_invoice',
            type: 'varchar',
          },
          {
            name: 'trip_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'integer',
            default: 1,
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
      'orders',
      new TableForeignKey({
        name: 'pk_deliveryman_id',
        columnNames: ['deliveryman_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'pk_requester_id',
        columnNames: ['requester_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'pk_trip_id',
        columnNames: ['trip_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'trips',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'pk_deliveryman_id');
    await queryRunner.dropForeignKey('orders', 'pk_requester_id');
    await queryRunner.dropForeignKey('orders', 'pk_trip_id');

    await queryRunner.dropTable('orders');
  }
}
