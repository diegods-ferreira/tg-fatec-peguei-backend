import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddWhatsappAndTelegramFieldsToTableUsers1621472095225
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'whatsapp',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'show_whatsapp',
        type: 'boolean',
        default: false,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'telegram',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'show_telegram',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'whatsapp');
    await queryRunner.dropColumn('users', 'show_whatsapp');
    await queryRunner.dropColumn('users', 'telegram');
    await queryRunner.dropColumn('users', 'show_telegram');
  }
}
