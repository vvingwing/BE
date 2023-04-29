import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';
import { payload } from '../../global/types/payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(req: Request): Promise<payload> {
    let token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException();
    }
    token = token.replace(/^Bearer\s+/, '');

    const userUUID = await this.authService.getTokenInfo(token);

    if (!userUUID) {
      throw new UnauthorizedException();
    }
    return { user_uuid: userUUID };
  }
}
