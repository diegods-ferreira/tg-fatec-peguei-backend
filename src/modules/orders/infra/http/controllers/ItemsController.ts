import UpdateItemService from '@modules/orders/services/UpdateItemService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ItemsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
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
    } = request.body;

    const updateItem = container.resolve(UpdateItemService);

    const item = await updateItem.execute({
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
    });

    return response.json(classToClass(item));
  }
}
