import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateGetDistanceFunction1606433429233
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace function getdistance(
        order_latitude double precision,
        order_longitude double precision,
        user_latitude double precision,
        user_longitude double precision
      ) returns double precision as
      $$
        declare
          d2r double precision;
            dlong double precision;
            dlat double precision;
            temp_sin double precision;
            temp_cos double precision;
            temp_sin2 double precision;
            a double precision;
            c double precision;

        begin
          d2r := 0.017453292519943295769236;

            dlong := (user_longitude - order_longitude) * d2r;
            dlat := (user_latitude - order_latitude) * d2r;

            temp_sin := sin(dlat/2.0);
            temp_cos := cos(order_latitude * d2r);
            temp_sin2 := sin(dlong/2.0);

            a := (temp_sin * temp_sin) + (temp_cos * temp_cos) * (temp_sin2 * temp_sin2);
            c := 2.0 * atan2(sqrt(a), sqrt(1.0 - a));

            return 6368.1 * c;
        end
      $$ language 'plpgsql';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop function getdistance');
  }
}
