import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

/**
 * This is the structure of a mail contact
 */
interface IMailContact {
  name: string;
  email: string;
}

/**
 * These are all the information of the mail
 */
export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
