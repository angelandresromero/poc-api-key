import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard, RequireApiKey } from './middlewares/api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @RequireApiKey()
  getHello(): string {
    return this.appService.getHello();
  }
}
