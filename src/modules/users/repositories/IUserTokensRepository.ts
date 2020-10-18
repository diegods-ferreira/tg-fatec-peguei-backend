import UserToken from '../infra/typeorm/entities/UserToken';

/**
 * These are the methods to the User Tokens Repository
 */
export default interface IUserTokensRepository {
  /**
   * Generates a token for an user
   * @param user_id user id
   */
  generate(user_id: string): Promise<UserToken>;

  /**
   * Finds a UserToken by a TOKEN
   * @param token user token
   */
  findByToken(token: string): Promise<UserToken | undefined>;
}
