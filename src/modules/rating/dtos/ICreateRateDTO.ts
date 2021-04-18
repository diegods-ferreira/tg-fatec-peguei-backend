export default interface ICreateRateDTO {
  order_id: string;
  requester_id: string;
  deliveryman_id: string;
  rate: number;
  comment: string;
}
