import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { LocalStrategy } from './guard/local.strategy';
import { UserRepository } from '../user/user.repository';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalGuard,
    LocalStrategy,
    UserRepository,
    JwtGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
