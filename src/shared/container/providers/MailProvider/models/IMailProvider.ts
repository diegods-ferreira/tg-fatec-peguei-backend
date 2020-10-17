import ISendMailDTO from '../dtos/ISendMailDTO';

/**
 * These are the methods to the mail provider
 */
export default interface IMailProvider {
  /**
   * Sends the email
   * @param data mail data
   */
  sendMail(data: ISendMailDTO): Promise<void>;
}
