import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { PiService } from './pi.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class PiServerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly piService: PiService) {}

  // map to store connected Pis and websockets
  private connectedPis = new Map<string, Socket>();

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    try {
      // create new Pi device
      const deviceId = client.handshake.query.deviceId;
      console.log(`Device ID: ${deviceId}`);

      // set web socket connection
      this.connectedPis.set(deviceId, client);
      console.log(`Device connected: ${deviceId}`);
    } catch (error) {
      console.error('Error connecting device:', error);
    }
  }

  handleDisconnect(client: Socket) {
    const deviceId = client.data?.deviceId;
    if (deviceId) {
      console.log(`Device disconnected: ${deviceId}`);

      //remove device from connected devices
      this.connectedPis.delete(deviceId);
    } else {
      console.error('Device ID not found for disconnected client.');
    }
  }

  @SubscribeMessage('register')
  async handleRegister(client: any, payload: any): Promise<string> {
    const { deviceId, accessToken } = payload;

    console.log(`Registering device: ${accessToken} with ID: ${deviceId}`);

    await this.piService.registerDevice(deviceId, accessToken);

    client.join(deviceId);
    console.log(`Device joined room: ${deviceId} with client ID: ${client.id}`);
    return 'Registered!';
  }

  sendMessageToDevice(
    deviceId: string,
    { command, target }: { command: string; target: string },
  ) {
    console.log('Sending message to device:', deviceId, command, target);

    this.connectedPis.forEach((socket, deviceId) => {
      console.log(`Device ID: ${deviceId}, Socket ID: ${socket.id}`);
    });
    // get web socket connection
    const client = this.connectedPis.get(deviceId);

    // send message to device
    console.log('sending message');
    if (client) {
      client.emit(target, command);
    }
  }
}
