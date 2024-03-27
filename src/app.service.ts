import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Esp32 } from './mqtt/entities/esp32.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Esp32)
    private esp32Repository: Repository<Esp32>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Function to generate a hash with a current timestamp
  private generateHashWithTimestamp(input: string): string {
    const combinedString = `${input}:${new Date().toISOString()}`;

    const hash = crypto
      .createHash('sha256')
      .update(combinedString)
      .digest('hex');

    return hash;
  }

  async registerDevice(deviceId: string): Promise<Esp32> {
    let device = await this.esp32Repository.findOne({
      where: { deviceId },
    });

    if (!device) {
      const accessToken = this.generateHashWithTimestamp(deviceId);

      const esp32 = this.esp32Repository.create({ deviceId, accessToken });
      console.log(`New device registered: ${deviceId}`);
      device = await this.esp32Repository.save(esp32);
    } else {
      console.log(`Device already registered: ${deviceId}`);
    }

    return device;
  }
}
