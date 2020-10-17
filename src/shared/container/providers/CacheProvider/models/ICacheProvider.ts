/**
 * These are the methods to the cache provider
 */
export default interface ICacheProvider {
  /**
   * Saves the data in cache
   * @param key storage key
   * @param value information to be saved
   */
  save(key: string, value: any): Promise<void>;

  /**
   * Returns the information stored in cache
   * @param key storage key
   */
  recover<T>(key: string): Promise<T | null>;

  /**
   * Removes all the information stored in a storage key
   * @param key storage key
   */
  invalidate(key: string): Promise<void>;

  /**
   * Removes the cache prefix
   * @param prefix cache prefix
   */
  invalidatePrefix(prefix: string): Promise<void>;
}
