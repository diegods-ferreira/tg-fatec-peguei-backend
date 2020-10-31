import Item from '@modules/orders/infra/typeorm/entities/Item';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => Item, item => item.category, {
    cascade: true,
  })
  items: Item[];
}

export default Category;
