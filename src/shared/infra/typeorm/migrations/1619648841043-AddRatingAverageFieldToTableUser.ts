import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRatingAverageFieldToTableUser1619648841043
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'rating_average',
        type: 'decimal',
        scale: 2,
        precision: 10,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'rating_average');
  }
}
