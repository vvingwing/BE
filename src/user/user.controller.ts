import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserInfoType } from '../global/types/userInfo.type';

@Controller('/auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() userDataDto: UserDto): Promise<UserInfoType> {
    return await this.userService.createUser(userDataDto);
  }
}
