import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IUnitsMeasureRepository from '@modules/units_measure/repositories/IUnitsMeasureRepository';
import UnitsMeasureRepository from '@modules/units_measure/infra/typeorm/repositories/UnitsMeasureRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import ITripsRepository from '@modules/trips/repositories/ITripsRepository';
import TripsRepository from '@modules/trips/infra/typeorm/repositories/TripsRepository';

import IRequestPickupOffersRepository from '@modules/request_pickup_offers/repositories/IRequestPickupOffersRepository';
import RequestPickupOffersRepository from '@modules/request_pickup_offers/infra/typeorm/repositories/RequestPickupOffersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IUnitsMeasureRepository>(
  'UnitsMeasureRepository',
  UnitsMeasureRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<ITripsRepository>(
  'TripsRepository',
  TripsRepository,
);

container.registerSingleton<IRequestPickupOffersRepository>(
  'RequestPickupOffersRepository',
  RequestPickupOffersRepository,
);
