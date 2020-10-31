import UpdateItemImageService from '@modules/orders/services/UpdateItemImageService';
import UpdateItemService from '@modules/orders/services/UpdateItemService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ItemsController {
  public async update(request: Request, response: Response): Promise<Response> {
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

    const updateItem = new UpdateItemService();

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
    });

    return response.json(classToClass(item));
  }

  public async uploadImage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateItemImage = container.resolve(UpdateItemImageService);

    const item = await updateItemImage.execute({
      item_id: request.body.item_id,
      image: request.file.filename,
    });

    return response.json(classToClass(item));
  }
}
