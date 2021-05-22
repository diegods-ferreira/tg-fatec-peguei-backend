import { container } from 'tsyringe';

import INotificationProvider from './models/INotificationProvider';

import OneSignalProvider from './implementations/OneSignalProvider';

const providers = {
  onesignal: OneSignalProvider,
};

container.registerSingleton<INotificationProvider>(
  'NotificationProvider',
  providers.onesignal,
);
