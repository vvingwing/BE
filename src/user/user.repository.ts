import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../global/entities/user.entity';
import { UserInfoType } from './types/userInfo.type';

@Injectable()
export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}
  private async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  async createUser(userDataDto: UserDto): Promise<UserInfoType> {
    const hashed_password = await this.hashPassword(userDataDto.user_password);

    const newUser = this.dataSource.manager.create(User, {
      user_id: userDataDto.user_id,
      user_password: hashed_password,
      user_name: userDataDto.user_name,
      nickname: userDataDto.nickname,
      age: userDataDto.age,
    });

    return await this.dataSource.manager.save(newUser);
  }

  async findUser(user_login_id: string) {
    return await this.dataSource.manager.findOne(User, {
      where: { user_id: user_login_id },
    });
  }
}
