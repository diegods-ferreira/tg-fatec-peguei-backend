import Order from '@modules/orders/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';

class UsersOrderTotalSeed {
  async execute(users: User[], orders: Order[]): Promise<User[]> {
    const updateProfile = container.resolve(UpdateProfileService);

    const [
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
    ] = users;
    const presentation =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const updatedMichael = await updateProfile.execute({
      user_id: michael.id,
      presentation,
      address: 'R. Cel. Benjamin da Costa Bueno, 166 - Santana',
      city: 'Pindamonhangaba',
      state: 'SP',
      phone: '12985742566',
      whatsapp: '12985742566',
      telegram: michael.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: michael.email,
      name: michael.name,
      username: michael.username,
      avatar: 'seed-user-michael.png',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === michael.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedDwight = await updateProfile.execute({
      user_id: dwight.id,
      presentation,
      address: 'R. Barão da Pedra Negra, 365 - Centro',
      city: 'Taubaté',
      state: 'SP',
      phone: '12956485426',
      whatsapp: '12956485426',
      telegram: dwight.username,
      show_email: false,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: true,
      email: dwight.email,
      name: dwight.name,
      username: dwight.username,
      avatar: 'seed-user-dwight.jpg',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === dwight.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedAngela = await updateProfile.execute({
      user_id: angela.id,
      presentation,
      address: 'Av. Osvaldo Aranha, 511 - Terra Nova',
      city: 'Taubaté',
      state: 'SP',
      phone: '129584725658',
      whatsapp: '129584725658',
      telegram: angela.username,
      show_email: true,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: false,
      email: angela.email,
      name: angela.name,
      username: angela.username,
      avatar: 'seed-user-angela.jpg',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === angela.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedKelly = await updateProfile.execute({
      user_id: kelly.id,
      presentation,
      address: 'R. Nossa Sra. da Glória, 101 - Solar da Mantiqueira',
      city: 'Tremembé',
      state: 'SP',
      phone: '12978362647',
      whatsapp: '12978362647',
      telegram: kelly.username,
      show_email: true,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: true,
      email: kelly.email,
      name: kelly.name,
      username: kelly.username,
      avatar: 'seed-user-kelly.jpg',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === kelly.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedKevin = await updateProfile.execute({
      user_id: kevin.id,
      presentation,
      address: 'Av. Antônio Cozzi, 831 - Jardim Res. Dr. Lessa',
      city: 'Pindamonhangaba',
      state: 'SP',
      phone: '12926548536',
      whatsapp: '12926548536',
      telegram: kevin.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: false,
      email: kevin.email,
      name: kevin.name,
      username: kevin.username,
      avatar: 'seed-user-kevin.png',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === kevin.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedStanley = await updateProfile.execute({
      user_id: stanley.id,
      presentation,
      address: 'R. Cap. Carlos de Moura, 116 - Vila Pantaleao',
      city: 'Caçapava',
      state: 'SP',
      phone: '12985743654',
      whatsapp: '12985743654',
      telegram: stanley.username,
      show_email: true,
      show_phone: false,
      show_telegram: false,
      show_whatsapp: false,
      email: stanley.email,
      name: stanley.name,
      username: stanley.username,
      avatar: 'seed-user-stanley.jpg',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === stanley.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedPhyllis = await updateProfile.execute({
      user_id: phyllis.id,
      presentation,
      address: 'R. Gisele Martins, 287 - Cidade Morumbi',
      city: 'São José dos Campos',
      state: 'SP',
      phone: '12936258574',
      whatsapp: '12936258574',
      telegram: phyllis.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: phyllis.email,
      name: phyllis.name,
      username: phyllis.username,
      avatar: 'seed-user-phyllis.png',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === phyllis.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedJim = await updateProfile.execute({
      user_id: jim.id,
      presentation,
      address: 'R. Timóteo, 156 - Bosque dos Eucaliptos',
      city: 'São José dos Campos',
      state: 'SP',
      phone: '12965789533',
      whatsapp: '12965789533',
      telegram: jim.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: jim.email,
      name: jim.name,
      username: jim.username,
      avatar: 'seed-user-jim.jpeg',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === jim.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedPam = await updateProfile.execute({
      user_id: pam.id,
      presentation,
      address: 'R. Timóteo, 156 - Bosque dos Eucaliptos',
      city: 'São José dos Campos',
      state: 'SP',
      phone: '12965789533',
      whatsapp: '12965789533',
      telegram: pam.username,
      show_email: true,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: false,
      email: pam.email,
      name: pam.name,
      username: pam.username,
      avatar: 'seed-user-pam.jpg',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === pam.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    const updatedRyan = await updateProfile.execute({
      user_id: ryan.id,
      presentation,
      address: 'R. Prof. Job Aíres Dias, 338 - Centro',
      city: 'Jacareí',
      state: 'SP',
      phone: '12985774266',
      whatsapp: '12985774266',
      telegram: ryan.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: ryan.email,
      name: ryan.name,
      username: ryan.username,
      avatar: 'seed-user-ryan.jpeg',
      orders_total: orders.reduce((accumulator, currentValue) => {
        return currentValue.requester_id === ryan.id
          ? accumulator + 1
          : accumulator + 0;
      }, 0),
    });

    return [
      updatedMichael,
      updatedDwight,
      updatedAngela,
      updatedKelly,
      updatedKevin,
      updatedStanley,
      updatedPhyllis,
      updatedJim,
      updatedPam,
      updatedRyan,
    ];
  }
}

export default UsersOrderTotalSeed;
