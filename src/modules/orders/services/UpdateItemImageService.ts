import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  item_id: string;
  image: string;
  user_id: string;
}

@injectable()
class UpdateItemImageService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ item_id, image, user_id }: IRequest): Promise<Item> {
    const itemsRepository = getRepository(Item);
    const item = await itemsRepository.findOne(item_id);

    if (!item) {
      throw new AppError('Item not found');
    }

    if (item.image) {
      await this.storageProvider.deleteFile(item.image);
    }

    const fileName = await this.storageProvider.saveFile(image);

    item.image = fileName;

    await itemsRepository.save(item);

    await this.cacheProvider.invalidate(`@Peguei!:user-orders-list:${user_id}`);

    return item;
  }
}

export default UpdateItemImageService;
