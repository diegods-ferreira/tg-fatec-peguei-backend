import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rating')
class Rate {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  order_id: string;

  @Column('uuid')
  requester_id: string;

  @Column('uuid')
  deliveryman_id: string;

  @Column('decimal')
  rate: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rate;
