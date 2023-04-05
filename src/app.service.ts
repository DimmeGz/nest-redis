import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class AppService {
  constructor() {}

  async set(req) {
    const client = createClient();
    await client.connect();

    for (let item of req) {
      const { key, value, ttl } = item;

      if (typeof value === 'object' && value !== null) {
        await client.json.set(key, '.', value);
      } else {
        await client.set(key, value, { EX: ttl });
      }
    }
    await client.quit();
    return 'ok';
  }

  async get(key) {
    const client = createClient();
    await client.connect();
    let result;
    try {
      result = await client.get(key);
    } catch (e) {
      result = await client.json.get(key);
    }
    await client.quit();
    return result;
  }

  async delete(key) {
    const client = createClient();
    await client.connect();
    await client.del(key);
    await client.quit();
    return `${key} was deleted`;
  }

  async reset() {
    const client = createClient();
    await client.connect();
    await client.flushAll();
    await client.quit();
    return `Everything deleted`;
  }
}
