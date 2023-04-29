import { IsDate, IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  question: string;

  @IsDate()
  used_At: Date;
}
