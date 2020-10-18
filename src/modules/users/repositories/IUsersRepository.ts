import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

/**
 * These are the methods to the users repository
 */
export default interface IUsersRepository {
  /**
   * Finds an user by an ID
   * @param id user id
   */
  findById(id: string): Promise<User | undefined>;

  /**
   * Finds an user by an USERNAME
   * @param username user username
   */
  findByUsername(username: string): Promise<User | undefined>;

  /**
   * Finds an user by an EMAIL
   * @param email user email
   */
  findByEmail(email: string): Promise<User | undefined>;

  /**
   * Creates a User instance
   * @param data user data
   */
  create(data: ICreateUserDTO): Promise<User>;

  /**
   * Saves the User in the database
   * @param user entity User
   */
  save(user: User): Promise<User>;
}
