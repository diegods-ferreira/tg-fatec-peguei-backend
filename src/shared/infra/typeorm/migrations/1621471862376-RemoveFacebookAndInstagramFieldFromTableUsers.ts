import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveFacebookAndInstagramFieldFromTableUsers1621471862376
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'facebook');
    await queryRunner.dropColumn('users', 'show_facebook');
    await queryRunner.dropColumn('users', 'instagram');
    await queryRunner.dropColumn('users', 'show_instagram');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'facebook',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'show_facebook',
        type: 'boolean',
        default: false,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'instagram',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'show_instagram',
        type: 'boolean',
        default: false,
      }),
    );
  }
}
