import axios from 'axios';

import INotificationProvider from '../models/INotificationProvider';
import ISendNotificationDTO from '../dtos/ISendNotificationDTO';

class OneSignalProvider implements INotificationProvider {
  private oneSignal;

  constructor() {
    this.oneSignal = axios.create({
      baseURL: 'https://onesignal.com:443/api/v1',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${process.env.ONE_SIGNAL_REST_API_KEY}`,
      },
    });
  }

  public async sendNotification({
    title,
    body,
    receiver,
    deep_link,
  }: ISendNotificationDTO): Promise<void> {
    const notification = {
      app_id: process.env.ONE_SIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: body },
      data: { deep_link },
      channel_for_external_user_ids: 'push',
      include_external_user_ids: [receiver],
    };

    try {
      await this.oneSignal.post('/notifications', notification);
    } catch (err) {
      console.error('Error sending offer to pickup notification:');
      console.log(err.response.data);
    }
  }
}

export default OneSignalProvider;
