import { Module } from '@nestjs/common';
import { PiController } from './pi.controller';
import { PiService } from './pi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pi } from './entities/pi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pi])],
  controllers: [PiController],
  providers: [PiService],
})
export class UsersModule {}
