export default interface ICreateTripDTO {
  user_id: string;
  destination_city: string;
  destination_state: string;
  return_city: string;
  return_state: string;
  departure_date: Date;
  return_date: Date;
}
