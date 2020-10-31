import Item from '@modules/orders/infra/typeorm/entities/Item';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Item, item => item.weight_unit_measure, {
    cascade: true,
  })
  items_weight_measure: Item[];

  @OneToMany(() => Item, item => item.dimension_unit_measure, {
    cascade: true,
  })
  items_dimension_measure: Item[];
}

export default UnitMeasure;
