import AppError from '@shared/errors/AppError';
import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import Item from '../infra/typeorm/entities/Item';

@injectable()
class ShowItemDetailsService {
  public async execute(item_id: string): Promise<Item> {
    const itemsRepository = getRepository(Item);

    const item = await itemsRepository.findOne(item_id);

    if (!item) {
      throw new AppError('Item not found');
    }

    return item;
  }
}

export default ShowItemDetailsService;
