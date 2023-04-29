import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { LocalStrategy } from './guard/local.strategy';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalGuard, LocalStrategy, UserRepository],
})
export class AuthModule {}
