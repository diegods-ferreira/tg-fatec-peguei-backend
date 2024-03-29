export default interface IFindAllOrdersDTO {
  except_user_id?: string;
  distance: number;
  user_location: {
    latitude: number;
    longitude: number;
  };
  page: number;
  date: Date;
}
