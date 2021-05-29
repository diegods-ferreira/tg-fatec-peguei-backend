import User from '@modules/users/infra/typeorm/entities/User';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';

class UsersProfileSeed {
  async execute(users: User[]): Promise<User[]> {
    const updateProfile = container.resolve(UpdateProfileService);

    const [
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
    ] = users;
    const presentation =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const updatedCecilia = await updateProfile.execute({
      user_id: cecilia.id,
      presentation,
      address: 'R. Cel. Benjamin da Costa Bueno, 166 - Santana',
      city: 'Pindamonhangaba',
      state: 'SP',
      phone: '12985742566',
      whatsapp: '12985742566',
      telegram: cecilia.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: cecilia.email,
      name: cecilia.name,
      username: cecilia.username,
      avatar: 'seed-user-cecilia.jpeg',
    });

    const updatedNoah = await updateProfile.execute({
      user_id: noah.id,
      presentation,
      address: 'R. Barão da Pedra Negra, 365 - Centro',
      city: 'Taubaté',
      state: 'SP',
      phone: '12956485426',
      whatsapp: '12956485426',
      telegram: noah.username,
      show_email: false,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: true,
      email: noah.email,
      name: noah.name,
      username: noah.username,
      avatar: 'seed-user-noah.jpeg',
    });

    const updatedHeloise = await updateProfile.execute({
      user_id: heloise.id,
      presentation,
      address: 'Av. Osvaldo Aranha, 511 - Terra Nova',
      city: 'Taubaté',
      state: 'SP',
      phone: '129584725658',
      whatsapp: '129584725658',
      telegram: heloise.username,
      show_email: true,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: false,
      email: heloise.email,
      name: heloise.name,
      username: heloise.username,
      avatar: 'seed-user-heloise.jpeg',
    });

    const updatedAlexandre = await updateProfile.execute({
      user_id: alexandre.id,
      presentation,
      address: 'R. Nossa Sra. da Glória, 101 - Solar da Mantiqueira',
      city: 'Tremembé',
      state: 'SP',
      phone: '12978362647',
      whatsapp: '12978362647',
      telegram: alexandre.username,
      show_email: true,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: true,
      email: alexandre.email,
      name: alexandre.name,
      username: alexandre.username,
      avatar: 'seed-user-alexandre.jpeg',
    });

    const updatedMarcela = await updateProfile.execute({
      user_id: marcela.id,
      presentation,
      address: 'Av. Antônio Cozzi, 831 - Jardim Res. Dr. Lessa',
      city: 'Pindamonhangaba',
      state: 'SP',
      phone: '12926548536',
      whatsapp: '12926548536',
      telegram: marcela.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: false,
      email: marcela.email,
      name: marcela.name,
      username: marcela.username,
      avatar: 'seed-user-marcela.jpeg',
    });

    const updatedLevi = await updateProfile.execute({
      user_id: levi.id,
      presentation,
      address: 'R. Cap. Carlos de Moura, 116 - Vila Pantaleao',
      city: 'Caçapava',
      state: 'SP',
      phone: '12985743654',
      whatsapp: '12985743654',
      telegram: levi.username,
      show_email: true,
      show_phone: false,
      show_telegram: false,
      show_whatsapp: false,
      email: levi.email,
      name: levi.name,
      username: levi.username,
      avatar: 'seed-user-levi.jpg',
    });

    const updatedBenicio = await updateProfile.execute({
      user_id: benicio.id,
      presentation,
      address: 'R. Gisele Martins, 287 - Cidade Morumbi',
      city: 'São José dos Campos',
      state: 'SP',
      phone: '12936258574',
      whatsapp: '12936258574',
      telegram: benicio.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: benicio.email,
      name: benicio.name,
      username: benicio.username,
      avatar: 'seed-user-benicio.jpeg',
    });

    const updatedEmanuelly = await updateProfile.execute({
      user_id: emanuelly.id,
      presentation,
      address: 'R. Timóteo, 156 - Bosque dos Eucaliptos',
      city: 'São José dos Campos',
      state: 'SP',
      phone: '12965789533',
      whatsapp: '12965789533',
      telegram: emanuelly.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: emanuelly.email,
      name: emanuelly.name,
      username: emanuelly.username,
      avatar: 'seed-user-emanuelly.jpeg',
    });

    const updatedCesar = await updateProfile.execute({
      user_id: cesar.id,
      presentation,
      address: 'R. Timóteo, 156 - Bosque dos Eucaliptos',
      city: 'São José dos Campos',
      state: 'SP',
      phone: '12965789533',
      whatsapp: '12965789533',
      telegram: cesar.username,
      show_email: true,
      show_phone: true,
      show_telegram: false,
      show_whatsapp: false,
      email: cesar.email,
      name: cesar.name,
      username: cesar.username,
      avatar: 'seed-user-cesar.jpeg',
    });

    const updatedLuiz = await updateProfile.execute({
      user_id: luiz.id,
      presentation,
      address: 'R. Prof. Job Aíres Dias, 338 - Centro',
      city: 'Jacareí',
      state: 'SP',
      phone: '12985774266',
      whatsapp: '12985774266',
      telegram: luiz.username,
      show_email: true,
      show_phone: true,
      show_telegram: true,
      show_whatsapp: true,
      email: luiz.email,
      name: luiz.name,
      username: luiz.username,
      avatar: 'seed-user-luiz.jpg',
    });

    return [
      updatedCecilia,
      updatedNoah,
      updatedHeloise,
      updatedAlexandre,
      updatedMarcela,
      updatedLevi,
      updatedBenicio,
      updatedEmanuelly,
      updatedCesar,
      updatedLuiz,
    ];
  }
}

export default UsersProfileSeed;
