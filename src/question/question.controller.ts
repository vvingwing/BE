import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';
import { Question } from '../global/entities/question.entity';
import { Answer } from '../global/entities/answer.entity';
import { User } from '../global/entities/user.entity';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('qna')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('random')
  async getQuestion(
    @Query('date') date: string,
    @Query('uuid') question_uuid: string,
  ): Promise<Question> {
    if (!date) {
      return await this.questionService.getQuestion(undefined, question_uuid);
    }
    const changed_date = new Date(Date.parse(date) - 9 * 3600 * 1000);
    return await this.questionService.getQuestion(changed_date, question_uuid);
  }

  @Get('/answer/group')
  @UseGuards(JwtGuard)
  async getGroupAnswer(
    @Query('group_uuid') group_uuid: string,
    @Query('question_uuid') question_uuid: string,
  ) {
    return await this.questionService.getAnswersGroup(
      group_uuid,
      question_uuid,
    );
  }

  @Post('create')
  async createQuestion(@Body() questionDto: QuestionDto): Promise<string> {
    await this.questionService.createQuestion(questionDto);
    return 'success';
  }

  @Post('/submit/answer')
  @UseGuards(JwtGuard)
  async submitAnswer(
    @Body('question_uuid') question_uuid: string,
    @Body('user_uuid') user_uuid: string,
    @Body('answer') answer: string,
    @Body('isPublic') isPublic: boolean,
  ): Promise<string> {
    await this.questionService.submitAnswer(
      question_uuid,
      user_uuid,
      answer,
      isPublic,
    );
    return 'success';
  }

  @Get('/all/answer')
  @UseGuards(JwtGuard)
  async getAllAnswer(@Query('user_uuid') user_uuid: string): Promise<Answer[]> {
    return await this.questionService.getAllAnswers(user_uuid);
  }

  @Get('/my_info')
  @UseGuards(JwtGuard)
  async getMyInfo(@Query('user_uuid') user_uuid: string): Promise<User[]> {
    return await this.questionService.getMyInfo(user_uuid);
  }

  @Get('/answer/public')
  @UseGuards(JwtGuard)
  async getPublicAnswer(
    @Query('question_uuid') question_uuid: string,
    @Query('lower') lower: number,
    @Query('upper') upper: number,
  ) {
    if (lower && upper) {
      return await this.questionService.getAnswersPublic(question_uuid, [
        lower,
        upper,
      ]);
    }
    return await this.questionService.getAnswersPublic(question_uuid);
  }
}
