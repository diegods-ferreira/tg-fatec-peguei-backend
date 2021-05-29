import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import CreateTripService from '@modules/trips/services/CreateTripService';
import User from '@modules/users/infra/typeorm/entities/User';
import { addDays } from 'date-fns';
import { container } from 'tsyringe';

function shuffleUsers(users: User[]): User[] {
  const shuffledUsers = users;
  for (let i = shuffledUsers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledUsers[i];
    shuffledUsers[i] = shuffledUsers[j];
    shuffledUsers[j] = temp;
  }

  return shuffledUsers;
}

class TripsSeed {
  async execute(users: User[]): Promise<Trip[]> {
    const array = [0, 1, 2, 3, 4];

    const cities = [
      'Pindamonhangaba',
      'Taubaté',
      'Tremembé',
      'São José dos Campos',
      'São Paulo',
      'Caçapava',
      'Limeira',
    ];

    const createTrip = container.resolve(CreateTripService);

    const createTripPromises = array.map(async () => {
      const randomNumber = Math.floor(Math.random() * 5);
      const randomNumberUpToSeven = Math.floor(Math.random() * 7);
      const usersRandomNumber = Math.floor(Math.random() * 10);
      const shuffledUsers = shuffleUsers(users);

      const trip = await createTrip.execute({
        departure_date: addDays(new Date(), randomNumber),
        destination_city: cities[randomNumberUpToSeven],
        destination_state: 'SP',
        return_city: shuffledUsers[usersRandomNumber].city,
        return_state: shuffledUsers[usersRandomNumber].state,
        return_date: addDays(
          addDays(new Date(), randomNumber),
          randomNumberUpToSeven,
        ),
        user_id: shuffledUsers[usersRandomNumber].id,
      });

      return trip;
    });

    const trips = Promise.all(createTripPromises);

    return trips;
  }
}

export default TripsSeed;
