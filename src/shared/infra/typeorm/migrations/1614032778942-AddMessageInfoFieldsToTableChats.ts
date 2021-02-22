import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddMessageInfoFieldsToTableChats1614032778942
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'chats',
      new TableColumn({
        name: 'last_message_text',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'chats',
      new TableColumn({
        name: 'last_message_sent_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('chats', 'last_message_text');
    await queryRunner.dropColumn('chats', 'last_message_sent_at');
  }
}
