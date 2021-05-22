import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveDeliveryLatitudeAndLongitudeFieldsFromTableOrders1621692922123
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'delivery_latitude');
    await queryRunner.dropColumn('orders', 'delivery_longitude');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'delivery_latitude',
        type: 'decimal',
        scale: 7,
        precision: 10,
      }),
    );

    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'delivery_longitude',
        type: 'decimal',
        scale: 7,
        precision: 10,
      }),
    );
  }
}
