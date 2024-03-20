import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PiService } from './pi.service';
import { CreatePiDto } from './dto/create-pi.dto';
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
    try {
      // const pi = await this.piService.findOne(id);
      console.log('Will send message to device:', piId);
      this.piServerGateway.sendMessageToDevice(piId, body);
    } catch (error) {
      throw new NotFoundException(`Pi with ID ${piId} not found.`);
    }
    // return this.piService.create(createPiDto);
  }
}
