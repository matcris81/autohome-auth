// import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
// // import aedes, { Aedes } from 'aedes'; // Adjusted import
// import { createServer, Server } from 'net';

// @Injectable()
// export class MqttBrokerService implements OnApplicationBootstrap {
//   //   private aedes: Aedes = aedes(); // Adjusted usage
//   private server: Server;
//   private port = 1883; // Default MQTT port

//   constructor() {
//     this.server = createServer(this.aedes.handle);
//   }

//   onApplicationBootstrap() {
//     this.server.listen(this.port, () => {
//       console.log(`MQTT broker running on port ${this.port}`);
//     });

//     this.aedes.on('client', (client) => {
//       console.log(`Client Connected: ${client.id}`);
//     });

//     this.aedes.on('publish', async (packet, client) => {
//       if (client) {
//         console.log(
//           `Message Published: ${packet.payload.toString()}, from client: ${
//             client.id
//           }`,
//         );
//       }
//     });
//   }
// }
