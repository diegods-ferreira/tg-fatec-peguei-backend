import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('request_pickup_offers')
class RequestPickupOffer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  order_id: string;

  @Column('uuid')
  deliveryman_id: string;

  @Column('decimal')
  delivery_value: number;

  @CreateDateColumn()
  created_at: Date;
}

export default RequestPickupOffer;
