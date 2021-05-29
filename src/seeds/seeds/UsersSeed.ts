import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

class UsersSeed {
  async execute(): Promise<User[]> {
    const createUser = container.resolve(CreateUserService);

    const cecilia = await createUser.execute({
      name: 'Cecília Paz',
      username: 'ceciliapaz',
      email: 'cecilia@email.com',
      password: '123456',
    });

    const noah = await createUser.execute({
      name: 'Noah Nunes',
      username: 'noahnunes',
      email: 'noah@email.com',
      password: '123456',
    });

    const heloise = await createUser.execute({
      name: 'Heloise Luiza',
      username: 'heloluiza',
      email: 'heloisa@email.com',
      password: '123456',
    });

    const alexandre = await createUser.execute({
      name: 'Alexandre Salgado',
      username: 'alexandresalgado',
      email: 'alexandre@email.com',
      password: '123456',
    });

    const marcela = await createUser.execute({
      name: 'Marcela Alves',
      username: 'marcelaalvez',
      email: 'marcela@email.com',
      password: '123456',
    });

    const levi = await createUser.execute({
      name: 'Levi Dias',
      username: 'levidias',
      email: 'levi@email.com',
      password: '123456',
    });

    const benicio = await createUser.execute({
      name: 'Benício Baptista',
      username: 'beniciobaptista',
      email: 'benicio@email.com',
      password: '123456',
    });

    const emanuelly = await createUser.execute({
      name: 'Emanuelly Fernanda',
      username: 'emanuellyfernanda',
      email: 'emanuelly@email.com',
      password: '123456',
    });

    const cesar = await createUser.execute({
      name: 'César Bernardes',
      username: 'cesarbernardes',
      email: 'cesar@email.com',
      password: '123456',
    });

    const luiz = await createUser.execute({
      name: 'Luiz Kevin Lopes',
      username: 'luizkevin',
      email: 'luiz@email.com',
      password: '123456',
    });

    return [
      cecilia,
      noah,
      heloise,
      alexandre,
      marcela,
      levi,
      benicio,
      emanuelly,
      cesar,
      luiz,
    ];
  }
}

export default UsersSeed;
