import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTripNumberFieldToTableTrips1621200007726
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'trips',
      new TableColumn({
        name: 'number',
        type: 'integer',
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('trips', 'number');
  }
}
