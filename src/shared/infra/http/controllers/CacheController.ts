import { Request, Response } from 'express';
import ClearCacheService from '@shared/services/ClearCacheService';
import { container } from 'tsyringe';

export default class CacheController {
  public async clear(request: Request, response: Response): Promise<Response> {
    const clearCache = container.resolve(ClearCacheService);

    await clearCache.execute();

    return response.json({ message: 'Cache cleared' });
  }
}
