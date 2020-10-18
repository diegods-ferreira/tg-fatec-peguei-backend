/**
 * These are the methods to the hash provider
 */
export default interface IHashProvider {
  /**
   * Generates a hash from the payload
   * @param payload payload
   */
  generateHash(payload: string): Promise<string>;

  /**
   * Compares the paylod with the hashed string
   * @param payload payload
   * @param hashed hashed
   */
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
