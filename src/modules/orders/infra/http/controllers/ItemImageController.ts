import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateItemImageService from '@modules/orders/services/UpdateItemImageService';
import { classToClass } from 'class-transformer';

export default class ItemImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const updateItemImage = container.resolve(UpdateItemImageService);

    const item = await updateItemImage.execute({
      item_id: request.body.item_id,
      image: request.file.filename,
      user_id,
    });

    return response.json(classToClass(item));
  }
}
