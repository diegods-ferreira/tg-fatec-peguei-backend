import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
  purchase_invoice: string;
  user_id: string;
}

@injectable()
class UpdateOrderPurchaseInvoiceService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    order_id,
    purchase_invoice,
    user_id,
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    if (order.purchase_invoice) {
      await this.storageProvider.deleteFile(order.purchase_invoice);
    }

    const fileName = await this.storageProvider.saveFile(purchase_invoice);

    order.purchase_invoice = fileName;

    await this.ordersRepository.save(order);

    await this.cacheProvider.invalidate(`@Peguei!:user-orders-list:${user_id}`);

    return order;
  }
}

export default UpdateOrderPurchaseInvoiceService;
