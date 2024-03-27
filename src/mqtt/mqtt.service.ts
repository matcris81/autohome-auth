// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MqttService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    });
  }

  // Method to publish messages
  publishMessage(topic: string, message: string) {
    this.client.emit<any>({ cmd: 'publish' }, { topic, message }).subscribe();
  }
}
