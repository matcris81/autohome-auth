import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [MqttModule],
  providers: [MqttService],
  controllers: [MqttController],
})
export class MqttModule {}
