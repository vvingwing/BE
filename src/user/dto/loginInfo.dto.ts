import { IsString } from 'class-validator';

export class LoginInfoDto {
  @IsString()
  user_id: string;

  @IsString()
  user_password: string;
}
