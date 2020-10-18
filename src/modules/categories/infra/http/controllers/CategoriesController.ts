import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListAllCategoriesService from '@modules/categories/services/ListAllCategoriesService';
import ListCategoryByNameService from '@modules/categories/services/ListCategoryByNameService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListAllCategoriesService);

    const categories = await listCategories.execute();

    return response.json(categories);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { category_name } = request.params;

    const listCategoryByName = container.resolve(ListCategoryByNameService);

    const category = await listCategoryByName.execute({ category_name });

    return response.json(category);
  }
}
