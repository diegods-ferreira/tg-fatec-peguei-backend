import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddOrdersTotalAndDeliveriesTotalFieldsToTableUsers1621547975728
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'orders_total',
        type: 'integer',
        default: 0,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'deliveries_total',
        type: 'integer',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'orders_total');
    await queryRunner.dropColumn('users', 'deliveries_total');
  }
}
