import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'MQTT_CLIENT',
    //     transport: Transport.MQTT,
    //     options: {
    //       url: 'mqtt://localhost:1883',
    //     },
    //   },
    // ]),
    MqttModule,
  ],
  providers: [MqttService],
  controllers: [MqttController],
})
export class MqttModule {}
