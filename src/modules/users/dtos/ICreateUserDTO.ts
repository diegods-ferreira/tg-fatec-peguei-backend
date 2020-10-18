/**
 * Defines the information needed to create an user
 */
export default interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}
