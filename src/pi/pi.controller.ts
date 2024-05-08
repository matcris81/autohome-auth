import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PiService } from './pi.service';
import { PiServerGateway } from './pi-server.gateway';

@Controller('pi')
export class PiController {
  constructor(
    private readonly piService: PiService,
    private readonly piServerGateway: PiServerGateway,
  ) {}

  @Post('send-command/:piId')
  async create(
    @Param('piId') piId: string,
    @Body() body: { command: string; target: string },
  ): Promise<void> {
    console.log('received command');
    try {
      // const pi = await this.piService.findOne(id);
      console.log('Will send message to device:', piId);
      this.piServerGateway.sendMessageToDevice(piId, body);
    } catch (error) {
      throw new NotFoundException(`Pi with ID ${piId} not found.`);
    }
  }

  @Get('getMacAddress/:piId')
  async getWifi(@Param('piId') piId: string): Promise<string> {
    const test = await this.piServerGateway.getWifiMacAddress(piId);
    console.log('test:', test);
    return test.data;
  }
}
