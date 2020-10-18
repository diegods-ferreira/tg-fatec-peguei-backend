import Category from '../infra/typeorm/entities/Category';

/**
 * These are the methods to the categories repository
 */
export default interface ICategoriesReposoty {
  /**
   * Finds all the categories
   */
  findAll(): Promise<Category[]>;

  /**
   * Finds a specific category by it's name
   * @param name ctegory name
   */
  findByName(name: string): Promise<Category[] | undefined>;
}
