import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
class ClearCacheService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<void> {
    await this.cacheProvider.invalidatePrefix('@Peguei!');
  }
}

export default ClearCacheService;
