import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { helloWorld } from '@smart-utility/hello-world-util';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(helloWorld());
    return this.appService.getHello();
  }
}
