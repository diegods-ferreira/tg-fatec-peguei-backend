import Order from '@modules/orders/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chats')
class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  deliveryman_id: string;

  @Column()
  requester_id: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  last_message_text: string;

  @Column()
  last_message_sent_at: Date;

  @Column('uuid')
  last_message_sent_by: string;

  @OneToOne(() => Order, order => order.chat, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User;
}

export default Chat;
