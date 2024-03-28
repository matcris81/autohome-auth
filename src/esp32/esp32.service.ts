// // mqtt.service.ts
// import { Injectable, OnModuleInit } from '@nestjs/common';
// import {
//   ClientProxy,
//   ClientProxyFactory,
//   Transport,
// } from '@nestjs/microservices';

// @Injectable()
// export class MqttService implements OnModuleInit {
//   private client: ClientProxy;

//   constructor() {
//     this.client = ClientProxyFactory.create({
//       transport: Transport.MQTT,
//       options: {
//         url: 'mqtt://localhost:1883', // Adjust as needed
//       },
//     });
//   }

//   onModuleInit() {
//     // Example subscription
//     const topic = 'your/topic';
//     this.client.send({ cmd: 'subscribe' }, topic).subscribe((message) => {
//       console.log('Received message:', message);
//     });
//   }

//   // Method to publish messages
//   publishMessage(topic: string, message: string) {
//     this.client.emit<any>({ cmd: 'publish' }, { topic, message }).subscribe();
//   }
// }
