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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Order, order => order.chat, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User;

  @Expose({ name: 'authenticated_user_is' })
  describeChatAs(): 'requester' | 'deliveryman' {
    if (this.requester_id === this.order.requester_id) {
      return 'requester';
    }

    return 'deliveryman';
  }
}

export default Chat;
