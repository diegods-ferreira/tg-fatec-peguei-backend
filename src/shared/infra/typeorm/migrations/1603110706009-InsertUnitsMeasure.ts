import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertUnitsMeasure1603110706009
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('units_measure')
      .values([
        {
          initials: 'km',
          description: 'Quilômetro',
          type: 1,
          type_description: 'Comprimento',
        },
        {
          initials: 'hm',
          description: 'Hectômetro',
          type: 1,
          type_description: 'Comprimento',
        },
        {
          initials: 'dam',
          description: 'Decâmetro',
          type: 1,
          type_description: 'Comprimento',
        },
        {
          initials: 'm',
          description: 'Metro',
          type: 1,
          type_description: 'Comprimento',
        },
        {
          initials: 'dm',
          description: 'Decímetro',
          type: 1,
          type_description: 'Comprimento',
        },
        {
          initials: 'cm',
          description: 'Centímetro',
          type: 1,
          type_description: 'Comprimento',
        },
        {
          initials: 'mm',
          description: 'Milímetro',
          type: 1,
          type_description: 'Comprimento',
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('units_measure')
      .values([
        {
          initials: 'kg',
          description: 'Quilograma',
          type: 2,
          type_description: 'Massa',
        },
        {
          initials: 'hg',
          description: 'Hectograma',
          type: 2,
          type_description: 'Massa',
        },
        {
          initials: 'dag',
          description: 'Decagrama',
          type: 2,
          type_description: 'Massa',
        },
        {
          initials: 'g',
          description: 'Grama',
          type: 2,
          type_description: 'Massa',
        },
        {
          initials: 'dg',
          description: 'Decigrama',
          type: 2,
          type_description: 'Massa',
        },
        {
          initials: 'cg',
          description: 'Centigrama',
          type: 2,
          type_description: 'Massa',
        },
        {
          initials: 'mg',
          description: 'Miligrama',
          type: 2,
          type_description: 'Massa',
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('units_measure')
      .values([
        {
          initials: 'kl',
          description: 'Quilolitro',
          type: 3,
          type_description: 'Capacidade',
        },
        {
          initials: 'hl',
          description: 'Hectolitro',
          type: 3,
          type_description: 'Capacidade',
        },
        {
          initials: 'dal',
          description: 'Decalitro',
          type: 3,
          type_description: 'Capacidade',
        },
        {
          initials: 'l',
          description: 'Litro',
          type: 3,
          type_description: 'Capacidade',
        },
        {
          initials: 'dl',
          description: 'Decilitro',
          type: 3,
          type_description: 'Capacidade',
        },
        {
          initials: 'cl',
          description: 'Centilitro',
          type: 3,
          type_description: 'Capacidade',
        },
        {
          initials: 'ml',
          description: 'Mililitro',
          type: 3,
          type_description: 'Capacidade',
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('units_measure')
      .values([
        {
          initials: 'km²',
          description: 'Quilômetro quadrado',
          type: 4,
          type_description: 'Área',
        },
        {
          initials: 'hm²',
          description: 'Hectômetro quadrado',
          type: 4,
          type_description: 'Área',
        },
        {
          initials: 'dam²',
          description: 'Decâmetro quadrado',
          type: 4,
          type_description: 'Área',
        },
        {
          initials: 'm²',
          description: 'Metro quadrado',
          type: 4,
          type_description: 'Área',
        },
        {
          initials: 'dm²',
          description: 'Decímetro quadrado',
          type: 4,
          type_description: 'Área',
        },
        {
          initials: 'cm²',
          description: 'Centímetro quadrado',
          type: 4,
          type_description: 'Área',
        },
        {
          initials: 'mm²',
          description: 'Milímetro quadrado',
          type: 4,
          type_description: 'Área',
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('units_measure')
      .values([
        {
          initials: 'km³',
          description: 'Quilômetro cúbico',
          type: 5,
          type_description: 'Volume',
        },
        {
          initials: 'hm³',
          description: 'Hectômetro cúbico',
          type: 5,
          type_description: 'Volume',
        },
        {
          initials: 'dam³',
          description: 'Decâmetro cúbico',
          type: 5,
          type_description: 'Volume',
        },
        {
          initials: 'm³',
          description: 'Metro cúbico',
          type: 5,
          type_description: 'Volume',
        },
        {
          initials: 'dm³',
          description: 'Decímetro cúbico',
          type: 5,
          type_description: 'Volume',
        },
        {
          initials: 'cm³',
          description: 'Centímetro cúbico',
          type: 5,
          type_description: 'Volume',
        },
        {
          initials: 'mm³',
          description: 'Milímetro cúbico',
          type: 5,
          type_description: 'Volume',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('units_measure')
      .execute();
  }
}
