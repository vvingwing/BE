import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginInfoDto } from '../user/dto/loginInfo.dto';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
  async validateUser(login_data: LoginInfoDto): Promise<boolean> {
    const { user_id, user_password } = login_data;

    const user = await this.userRepository.findUser(user_id);

    if (user === null) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    return bcrypt.compareSync(user_password, user.user_password);
  }

  async getJWTToken(userdata) {
    const { user_nickname } = userdata;
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const jwtExpire = this.configService.get<string>('JWT_EXPIRE');

    const registerJWTToken = jwt.sign(
      { user_nickname: user_nickname },
      jwtSecret,
      {
        algorithm: 'HS256',
        expiresIn: jwtExpire,
      },
    );

    return { registerJWTToken: registerJWTToken };
  }
}
