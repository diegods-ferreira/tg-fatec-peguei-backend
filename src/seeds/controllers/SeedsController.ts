import { Request, Response } from 'express';
import OrdersSeed from 'seeds/seeds/OrdersSeed';
import TripsSeed from 'seeds/seeds/TripsSeed';
import UsersOrderTotalSeed from 'seeds/seeds/UsersOrderTotalSeed';
import UsersProfileSeed from 'seeds/seeds/UsersProfileSeed';
import UsersSeed from 'seeds/seeds/UsersSeed';

export default class SeedsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersSeed = new UsersSeed();
    const usersProfileSeed = new UsersProfileSeed();
    const ordersSeed = new OrdersSeed();
    const tripsSeed = new TripsSeed();
    const usersOrdersTotalSeed = new UsersOrderTotalSeed();

    const users = await usersSeed.execute();
    const updatedUsers = await usersProfileSeed.execute(users);
    const orders = await ordersSeed.execute(updatedUsers);
    const trips = await tripsSeed.execute(updatedUsers);
    const usersOrdersTotal = await usersOrdersTotalSeed.execute(users, orders);

    console.log('----------- PEGUEI! - SEEDS LOGS -----------');
    console.log(`>> UsersSeed ${users.length ? 'succeded' : 'failed'}`);
    console.log(
      `>> UsersProfileSeed ${updatedUsers.length ? 'succeded' : 'failed'}`,
    );
    console.log(`>> OrdersSeed ${orders.length ? 'succeded' : 'failed'}`);
    console.log(`>> TripsSeed ${trips.length ? 'succeded' : 'failed'}`);
    console.log(
      `>> UsersOrderTotalSeed ${
        usersOrdersTotal.length ? 'succeded' : 'failed'
      }`,
    );
    console.log('--------------------------------------------');

    return response.status(200).send();
  }
}
