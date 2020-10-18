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
          icon: 'fa-book',
        },
        {
          name: 'Eletrodomésticos e Casa',
          icon: 'fa-blender-phone',
        },
        {
          name: 'Games e PC Gamer',
          icon: 'fa-gamepad',
        },
        {
          name: 'Celulares',
          icon: 'fa-mobile-alt',
        },
        {
          name: 'TV, Áudio e Home Theater',
          icon: 'fa-tv',
        },
        {
          name: 'Informática',
          icon: 'fa-mouse',
        },
        {
          name: 'Moda',
          icon: 'fa-tshirt',
        },
        {
          name: 'Esporte e Suplementos',
          icon: 'fa-futbol',
        },
        {
          name: 'Móveis e Decoração',
          icon: 'fa-couch',
        },
        {
          name: 'Beleza e Perfumaria',
          icon: 'fa-eye',
        },
        {
          name: 'Outros',
          icon: 'fa-box',
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
