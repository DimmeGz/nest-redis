import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisClientService {
  private client;

  async onModuleInit() {
    this.client = createClient();
    await this.client.connect();
  }

  async set(key: string, value: any, ttl: number) {
    return await this.client.set(key, value, { EX: ttl });
  }

  async setJson (key: string, value: any) {
    return await this.client.json.set(key, '.', value);
  }

  async get(key) {
    try {
        return await this.client.get(key);
    } catch (e) {
        throw e
    }
  }

  async getJson(key) {
    try {
        return await this.client.json.get(key);
    } catch (e) {
        throw e
    }
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
