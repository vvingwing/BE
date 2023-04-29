import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req) {
    return await this.authService.getJWTToken(req.user);
  }
}
