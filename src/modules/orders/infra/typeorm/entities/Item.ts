import Category from '@modules/categories/infra/typeorm/entities/Category';
import UnitMeasure from '@modules/units_measure/infra/typeorm/entities/UnitMeasure';
import uploadConfig from '@config/upload';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import Order from './Order';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @ManyToOne(() => Order, order => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  weight: number;

  @Column('decimal')
  width: number;

  @Column('decimal')
  height: number;

  @Column('decimal')
  depth: number;

  @Column()
  packing: string;

  @Column('int')
  category_id: number;

  @ManyToOne(() => Category, category => category.items, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('int')
  weight_unit_id: number;

  @ManyToOne(
    () => UnitMeasure,
    unitMeasure => unitMeasure.items_weight_measure,
    { eager: true },
  )
  @JoinColumn({ name: 'weight_unit_id' })
  weight_unit_measure: UnitMeasure;

  @Column('int')
  dimension_unit_id: number;

  @ManyToOne(
    () => UnitMeasure,
    unitMeasure => unitMeasure.items_dimension_measure,
    { eager: true },
  )
  @JoinColumn({ name: 'dimension_unit_id' })
  dimension_unit_measure: UnitMeasure;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.image}`;
      default:
        return null;
    }
  }
}

export default Item;
