// mqtt.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    });
  }

  onModuleInit() {
    this.client.connect();
  }

  // Method to publish messages
  publishMessage(topic: string, message: string) {
    console.log('publishing message', topic, message);
    this.client.send(topic, message).subscribe({
      next: () => console.log('Message published successfully'),
      error: (error) => console.error('Error publishing message:', error),
    });
  }
}
