import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

class UsersSeed {
  async execute(): Promise<User[]> {
    const createUser = container.resolve(CreateUserService);

    const michael = await createUser.execute({
      name: 'Michael Scott',
      username: 'mikescott',
      email: 'michael@email.com',
      password: '123456',
    });

    const dwight = await createUser.execute({
      name: 'Dwight Schrute',
      username: 'dwightschrute',
      email: 'dwight@email.com',
      password: '123456',
    });

    const angela = await createUser.execute({
      name: 'Angela Martin',
      username: 'angelamartin',
      email: 'angela@email.com',
      password: '123456',
    });

    const kelly = await createUser.execute({
      name: 'Kelly Kappor',
      username: 'prettykelly',
      email: 'kelly@email.com',
      password: '123456',
    });

    const kevin = await createUser.execute({
      name: 'Kevin Malone',
      username: 'kevinmm',
      email: 'kevin@email.com',
      password: '123456',
    });

    const stanley = await createUser.execute({
      name: 'Stanley Hudson',
      username: 'pretzelday',
      email: 'stanley@email.com',
      password: '123456',
    });

    const phyllis = await createUser.execute({
      name: 'Phyllis Vance',
      username: 'phyllis',
      email: 'phyllis@email.com',
      password: '123456',
    });

    const jim = await createUser.execute({
      name: 'Jim Halpert',
      username: 'jimmy',
      email: 'jim@email.com',
      password: '123456',
    });

    const pam = await createUser.execute({
      name: 'Pam Beesly',
      username: 'pammy',
      email: 'pam@email.com',
      password: '123456',
    });

    const ryan = await createUser.execute({
      name: 'Ryan Howard',
      username: 'ryanh',
      email: 'ryan@email.com',
      password: '123456',
    });

    return [
      michael,
      dwight,
      angela,
      kelly,
      kevin,
      stanley,
      phyllis,
      jim,
      pam,
      ryan,
    ];
  }
}

export default UsersSeed;
