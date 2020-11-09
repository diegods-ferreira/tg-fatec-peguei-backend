import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import Trip from '@modules/trips/infra/typeorm/entities/Trip';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  facebook: string;

  @Column()
  instagram: string;

  @Column()
  phone: string;

  @Column()
  presentation: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  avatar: string;

  @Column()
  username: string;

  @Column()
  show_email: boolean;

  @Column()
  show_facebook: boolean;

  @Column()
  show_instagram: boolean;

  @Column()
  show_phone: boolean;

  @OneToMany(() => Order, order => order.requester, {
    cascade: true,
  })
  orders_as_requester: Order[];

  @OneToMany(() => Order, order => order.deliveryman, {
    cascade: true,
  })
  orders_as_deliveryman: Order[];

  @OneToMany(() => Trip, trip => trip.user, {
    cascade: true,
  })
  trips: Trip[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
