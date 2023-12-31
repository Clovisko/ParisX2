import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, LocalStrategy],
  imports: [UsersModule],
})
export class AuthModule {}
