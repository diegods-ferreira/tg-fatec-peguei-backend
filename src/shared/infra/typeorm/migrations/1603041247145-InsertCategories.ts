import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertCategories1603041247145
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('categories')
      .values([
        {
          name: 'Livros',
          icon: 'book',
        },
        {
          name: 'Eletrodomésticos e Casa',
          icon: 'blender-phone',
        },
        {
          name: 'Games e PC Gamer',
          icon: 'gamepad',
        },
        {
          name: 'Celulares',
          icon: 'mobile-alt',
        },
        {
          name: 'TV, Áudio e Home Theater',
          icon: 'tv',
        },
        {
          name: 'Informática',
          icon: 'mouse',
        },
        {
          name: 'Moda',
          icon: 'tshirt',
        },
        {
          name: 'Esporte e Suplementos',
          icon: 'futbol',
        },
        {
          name: 'Móveis e Decoração',
          icon: 'couch',
        },
        {
          name: 'Beleza e Perfumaria',
          icon: 'eye',
        },
        {
          name: 'Outros',
          icon: 'box',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('categories')
      .execute();
  }
}
