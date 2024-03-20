import { Module } from '@nestjs/common';
import { PiController } from './pi.controller';
import { PiService } from './pi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pi } from './entities/pi.entity';
import { PiServerGateway } from './pi-server.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Pi])],
  controllers: [PiController],
  providers: [PiService, PiServerGateway],
})
export class UsersModule {}
