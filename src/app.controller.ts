import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createClient } from 'redis';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() requestBody): Promise<any> {
    return this.appService.set(requestBody);
  }

  @Get(':key')
  getOne(@Param('key') key: string): Promise<any> {
    return this.appService.get(key);
  }

  @Delete('/delete/:key')
  removeOne(@Param('key') key: string): Promise<any> {
    return this.appService.delete(key);
  }

  @Delete('/delete_all')
  removeAll(): Promise<any> {
    return this.appService.reset();
  }
}
