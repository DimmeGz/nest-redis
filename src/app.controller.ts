import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() requestBody): Promise<any> {
    return this.appService.set(requestBody);
  }

  @Get(":key")
  getOne(@Param("key") key: string): Promise<any> {
    return this.appService.get(key);
  }

  @Delete("/delete/:key")
  removeOne(@Param("key") key: string): Promise<any> {
    return this.appService.delete(key);
  }
}
