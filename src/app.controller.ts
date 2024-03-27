import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('registerDevice')
  registerDevice(@Body() body: { deviceId: string }) {
    console.log('Registering device:', body.deviceId);
    this.appService.registerDevice(body.deviceId);
    return { message: `Device ${body.deviceId} registered successfully.` };
  }
}
