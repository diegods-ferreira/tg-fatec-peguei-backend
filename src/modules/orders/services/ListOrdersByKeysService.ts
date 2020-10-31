// import AppError from '@shared/errors/AppError';
// import { inject, injectable } from 'tsyringe';
// import Order from '../infra/typeorm/entities/Order';
// import IOrdersRepository from '../repositories/IOrdersRepository';

// interface IRquest {
//   [key: string]: string;
// }

// @injectable()
// class ListOrdersByKeysService {
//   constructor(
//     @inject('OrdersRepository')
//     private ordersRepository: IOrdersRepository,
//   ) {}

//   public async execute(keys: IRquest): Promise<Order[]> {
//     const orders = await this.ordersRepository.findByKeys(keys);

//     if (!orders) {
//       throw new AppError('Nothing was found');
//     }

//     return orders;
//   }
// }

// export default ListOrdersByKeysService;
