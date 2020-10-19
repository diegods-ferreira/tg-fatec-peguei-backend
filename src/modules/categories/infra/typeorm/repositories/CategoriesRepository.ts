import ICategoriesReposoty from '@modules/categories/repositories/ICategoriesRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesReposoty {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category[] | undefined> {
    const categories = await this.ormRepository.find({
      where: { name: Like(`%${name}%`) },
    });

    return categories;
  }
}

export default CategoriesRepository;
