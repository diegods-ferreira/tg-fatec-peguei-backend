import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  width: number;
  height: number;
  depth: number;
  packing: string;
  category_id: number;
  weight_unit_id: number;
  dimension_unit_id: number;
  description: string;
  user_id: string;
}

@injectable()
class UpdateItemService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    quantity,
    weight,
    width,
    height,
    depth,
    packing,
    category_id,
    weight_unit_id,
    dimension_unit_id,
    description,
    user_id,
  }: IRequest): Promise<Item> {
    const itemsRepository = getRepository(Item);

    const item = await itemsRepository.findOne(id);

    if (!item) {
      throw new AppError('Item not found');
    }

    Object.assign(item, {
      name,
      quantity,
      weight,
      width,
      height,
      depth,
      packing,
      category_id,
      weight_unit_id,
      dimension_unit_id,
      description,
    });

    await this.cacheProvider.invalidate(`@Peguei!:user-orders-list:${user_id}`);

    return itemsRepository.save(item);
  }
}

export default UpdateItemService;
