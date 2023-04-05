import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';


@Injectable()
export class AppService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async set(req) {
    for (let item of req) {
        const {key, value, ttl} = item
        await this.redis.set(key, value, 'EX', ttl);
    }
    return 'ok'
  }

  async get(key) {
    const result = await this.redis.get(key)
    return result
  }

  async delete(key) {
    await this.redis.del(key)
    return `${key} was deleted`
  }
}