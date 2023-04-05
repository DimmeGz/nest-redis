import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class AppService {
  private client;

  async onModuleInit() {
    this.client = createClient();
    await this.client.connect();
  }

  async set(req) {
    for (let item of req) {
      const { key, value, ttl } = item;

      if (typeof value === 'object' && value !== null) {
        await this.client.json.set(key, '.', value);
      } else {
        await this.client.set(key, value, { EX: ttl });
      }
    }
    return 'ok';
  }

  async get(key) {
    let result;
    try {
      result = await this.client.get(key);
    } catch (e) {
      result = await this.client.json.get(key);
    }
    return result;
  }

  async delete(key) {
    await this.client.del(key);
    return `${key} was deleted`;
  }

  async reset() {
    await this.client.flushAll();
    return `Everything deleted`;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
