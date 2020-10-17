/**
 * Defines the type of every variable key
 */
interface ITemplateVariables {
  [key: string]: string | number;
}

/**
 * Defines the properties of the mail template
 */
export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
