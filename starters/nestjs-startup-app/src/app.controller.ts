import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { helloWorld } from '@smart-utilities/hello-world-util/src';
// import { formatDate } from '@smart-utilities/date-helpers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(helloWorld());
    // console.log(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'));
    return this.appService.getHello();
  }
}
