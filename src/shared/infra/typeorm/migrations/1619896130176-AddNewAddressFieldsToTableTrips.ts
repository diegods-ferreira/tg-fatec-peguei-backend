import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNewAddressFieldsToTableTrips1619896130176
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'destination_address',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'destination_city',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'destination_state',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'return_address',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'return_city',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'return_state',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'status',
        type: 'integer',
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('trips', 'destination_address');
    await queryRunner.dropColumn('trips', 'destination_city');
    await queryRunner.dropColumn('trips', 'destination_state');
    await queryRunner.dropColumn('trips', 'return_address');
    await queryRunner.dropColumn('trips', 'return_city');
    await queryRunner.dropColumn('trips', 'return_state');
    await queryRunner.dropColumn('trips', 'status');
  }
}
