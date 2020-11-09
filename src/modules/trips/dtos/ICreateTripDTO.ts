export default interface ICreateTripDTO {
  user_id: string;
  destination: string;
  return_location: string;
  destination_latitude: number;
  destination_longitude: number;
  departure_date: Date;
  return_date: Date;
}
