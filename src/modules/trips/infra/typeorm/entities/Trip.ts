import Order from '@modules/orders/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trips')
class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.trips, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  destination_city: string;

  @Column()
  destination_state: string;

  @Column()
  return_city: string;

  @Column()
  return_state: string;

  @Column()
  status: number;

  @Column()
  departure_date: Date;

  @Column()
  return_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, order => order.trip, { cascade: true })
  orders: Order[];
}

export default Trip;
