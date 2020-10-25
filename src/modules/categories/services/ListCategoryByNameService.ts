import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  category_name: string;
}

@injectable()
class ListCategoryByNameService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    category_name,
  }: IRequest): Promise<Category[] | undefined> {
    if (!category_name) {
      throw new AppError('You must inform the category_name query param');
    }

    const category = await this.categoriesRepository.findByName(category_name);

    return category;
  }
}

export default ListCategoryByNameService;
