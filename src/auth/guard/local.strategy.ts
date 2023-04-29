import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      usernameField: 'user_id',
      passwordField: 'user_password',
    });
  }
  async validate(user_id: string, user_password: string): Promise<any> {
    const login_data = { user_id: user_id, user_password: user_password };
    const user_data = await this.userRepository.findUser(user_id);
    const user = await this.authService.validateUser(login_data);
    if (user === false) {
      throw new HttpException('login failed', HttpStatus.UNAUTHORIZED);
    }
    return {
      user_name: user_data.user_name,
      user_nickname: user_data.nickname,
    };
  }
}
