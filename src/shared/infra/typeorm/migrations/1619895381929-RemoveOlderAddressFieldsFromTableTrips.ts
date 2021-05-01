import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveOlderAddressFieldsFromTableTrips1619895381929
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('trips', 'destination');
    await queryRunner.dropColumn('trips', 'destination_latitude');
    await queryRunner.dropColumn('trips', 'destination_longitude');
    await queryRunner.dropColumn('trips', 'return_location');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'destination',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'destination_latitude',
        type: 'decimal',
        scale: 7,
        precision: 10,
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'destination_longitude',
        type: 'decimal',
        scale: 7,
        precision: 10,
      }),
    );

    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'return_location',
        type: 'varchar',
      }),
    );
  }
}
