import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddOrderNumberFieldToTableOrders1614556088024
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'number',
        type: 'integer',
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'number');
  }
}
