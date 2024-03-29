import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableTrips1602931427813
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trips',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'destination',
            type: 'varchar',
          },
          {
            name: 'return_location',
            type: 'varchar',
          },
          {
            name: 'destination_latitude',
            type: 'decimal',
            scale: 7,
            precision: 10,
          },
          {
            name: 'destination_longitude',
            type: 'decimal',
            scale: 7,
            precision: 10,
          },
          {
            name: 'departure_date',
            type: 'timestamp',
          },
          {
            name: 'return_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'trips',
      new TableForeignKey({
        name: 'pk_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trips', 'pk_user_id');

    await queryRunner.dropTable('trips');
  }
}
