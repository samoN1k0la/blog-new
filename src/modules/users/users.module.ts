import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthRepository } from './repositories/auth.repository';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { DatabaseModule } from '../../global/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'secretKey', // will change later
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [
    UsersController,
    AuthController
  ],
  providers: [
    UsersService, 
    AuthService,
    UserRepository,
    AuthRepository
  ],
})
export class UsersModule {}
