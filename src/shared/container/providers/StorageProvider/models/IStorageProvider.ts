/**
 * These are the methods to the storage provider
 */
export default interface IStorageProvider {
  /**
   * Saves the file in the storage
   * @param file file location
   */
  saveFile(file: string): Promise<string>;

  /**
   * Removes the file from the storage
   * @param file file location
   */
  deleteFile(file: string): Promise<void>;
}
