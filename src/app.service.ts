import { Injectable } from '@nestjs/common';
import { RedisClientService } from './redis-client/redis-client.service';

@Injectable()
export class AppService {
  constructor(private readonly redisClientService: RedisClientService){}

  async set(req) {
    for (let item of req) {
      const { key, value, ttl } = item;

      if (typeof value === 'object' && value !== null) {
        await this.redisClientService.setJson(key, value)
      } else {
        await this.redisClientService.set(key, value, ttl)
      }
    }
    return 'ok';
  }

  async get(key) {
    try {
      return await this.redisClientService.get(key)
    } catch (e) {
      return await this.redisClientService.getJson(key)
    }
  }

  async delete(key) {
    return await this.redisClientService.delete(key)
  }

  async reset() {
    return await this.redisClientService.reset()
  }
}
