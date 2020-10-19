import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('units_measure')
class UnitMeasure {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  initials: string;

  @Column()
  description: string;

  @Column()
  type: number;

  @Column()
  type_description: string;
}

export default UnitMeasure;
