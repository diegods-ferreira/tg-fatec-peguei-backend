import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesReposoty {
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category[] | undefined>;
}
