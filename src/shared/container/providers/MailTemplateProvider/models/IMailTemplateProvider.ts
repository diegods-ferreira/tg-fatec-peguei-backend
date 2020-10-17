import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

/**
 * These are the methods to the mail template provider
 */
export default interface IMailTemplateProvider {
  /**
   * Saves the data to the mail template
   * @param data email data
   */
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
