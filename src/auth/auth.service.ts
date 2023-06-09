import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginInfoDto } from '../user/dto/loginInfo.dto';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { payload } from '../global/types/payload.type';

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

  async getTokenInfo(jwtToken: string) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const decoded = jwt.verify(jwtToken, jwtSecret);
    /*let decoded: payload;
    try {
      decoded = jwt.verify(jwtToken, jwtSecret);
    } catch (e) {
      throw new UnauthorizedException();
    }*/

    if (decoded.user_uuid) {
      return decoded.user_uuid;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getJWTToken(userdata) {
    const { user_uuid } = userdata;
    const jwtSecret = await this.configService.get<string>('JWT_SECRET');
    const jwtExpire = await this.configService.get<string>('JWT_EXPIRE');

    const registerJWTToken = jwt.sign({ user_uuid: user_uuid }, jwtSecret, {
      algorithm: 'HS256',
      expiresIn: jwtExpire,
    });

    return { registerJWTToken: registerJWTToken };
  }
}
