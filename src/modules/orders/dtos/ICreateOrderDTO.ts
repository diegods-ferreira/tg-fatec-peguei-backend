import Item from '../infra/typeorm/entities/Item';

export default interface ICreateOrderDTO {
  deliveryman_id?: string;
  requester_id: string;
  pickup_date: Date;
  pickup_establishment: string;
  pickup_address: string;
  pickup_city: string;
  pickup_state: string;
  pickup_latitude: number;
  pickup_longitude: number;
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  delivery_latitude: number;
  delivery_longitude: number;
  trip_id?: string;
  items: Item[];
}
