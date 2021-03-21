import Order from '@modules/orders/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('request_pickup_offers')
class RequestPickupOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  order_id: string;

  @Column('uuid')
  deliveryman_id: string;

  @Column('decimal', {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  delivery_value: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User;

  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}

export default RequestPickupOffer;
