import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  user_name: string;

  @IsString()
  nickname: string;

  @IsNumber()
  age: number;

  @IsString()
  user_id: string;

  @IsString()
  user_password: string;
}
