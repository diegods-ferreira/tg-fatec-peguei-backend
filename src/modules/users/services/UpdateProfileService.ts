import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  username: string;
  email: string;
  presentation: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  show_email: boolean;
  show_whatsapp: boolean;
  show_telegram: boolean;
  show_phone: boolean;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    username,
    email,
    presentation,
    address,
    city,
    state,
    phone,
    whatsapp,
    telegram,
    show_email,
    show_whatsapp,
    show_telegram,
    show_phone,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    const userWithUpdatedUsername = await this.usersRepository.findByUsername(
      username,
    );

    if (userWithUpdatedUsername && userWithUpdatedUsername.id !== user_id) {
      throw new AppError('Username already in use.');
    }

    user.name = name;
    user.email = email;
    user.username = username;
    user.presentation = presentation;
    user.address = address;
    user.city = city;
    user.state = state;
    user.phone = phone;
    user.whatsapp = whatsapp;
    user.telegram = telegram;
    user.show_email = show_email;
    user.show_whatsapp = show_whatsapp;
    user.show_telegram = show_telegram;
    user.show_phone = show_phone;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
