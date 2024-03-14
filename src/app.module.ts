import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Pi } from './pi/entities/pi.entity';
import { Feature } from './pi/entities/feature.entity';
import { UsersController } from './user/user.controller';
import { PiController } from './pi/pi.controller';
import { UserService } from './user/user.service';
import { PiService } from './pi/pi.service';
import { PiServerGateway } from './pi-server/pi-server.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kaido',
      password: '123456',
      database: 'postgres',
      entities: [User, Pi, Feature],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Pi, Feature]),
  ],
  controllers: [AppController, UsersController, PiController],
  providers: [AppService, UserService, PiService, PiServerGateway],
})
export class AppModule {}
