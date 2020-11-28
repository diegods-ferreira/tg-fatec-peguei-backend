export default interface IFindAllTripsDTO {
  except_user_id?: string;
  distance: number;
  user_location: {
    latitude: number;
    longitude: number;
  };
}
