import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisClientModule } from './redis-client/redis-client.module';

@Module({
  imports: [RedisClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
