import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import Chat from '@modules/chats/infra/typeorm/entities/Chat';
import RequestPickupOffer from '@modules/request_pickup_offers/infra/typeorm/entities/RequestPickupOffer';
import Item from './Item';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryman_id: string;

  @ManyToOne(() => User, user => user.orders_as_deliveryman, { eager: true })
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User;

  @Column()
  requester_id: string;

  @ManyToOne(() => User, user => user.orders_as_requester, { eager: true })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column()
  pickup_date: Date;

  @Column()
  pickup_establishment: string;

  @Column()
  pickup_address: string;

  @Column()
  pickup_city: string;

  @Column()
  pickup_state: string;

  @Column('decimal')
  pickup_latitude: number;

  @Column('decimal')
  pickup_longitude: number;

  @Column()
  delivery_address: string;

  @Column()
  delivery_city: string;

  @Column()
  delivery_state: string;

  @Column('decimal')
  delivery_latitude: number;

  @Column('decimal')
  delivery_longitude: number;

  @Column('decimal')
  delivery_value: number;

  @Column()
  purchase_invoice: string;

  @Column()
  trip_id: string;

  @Column('int')
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  number: number;

  @OneToMany(() => Item, item => item.order, {
    cascade: true,
  })
  items: Item[];

  @ManyToOne(() => Trip, trip => trip.orders, { eager: true })
  @JoinColumn({ name: 'trip_id' })
  trip: Trip[];

  @OneToOne(() => Chat, chat => chat.order)
  chat: Chat;

  @OneToMany(
    () => RequestPickupOffer,
    requestPickupOffer => requestPickupOffer.order,
    {
      cascade: true,
    },
  )
  request_pickup_offers: RequestPickupOffer[];

  @Expose({ name: 'purchase_invoice_url' })
  getPurchaseInvoiceUrl(): string | null {
    if (!this.purchase_invoice) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.purchase_invoice}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.purchase_invoice}`;
      default:
        return null;
    }
  }
}

export default Order;
