import { Body, Controller, Post } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('sendMessage')
  sendMessage(@Body() body: { topic: string; message: string }) {
    this.mqttService.publishMessage(body.topic, body.message);
  }
}
