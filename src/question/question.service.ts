import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../global/entities/user.entity';
import { DataSource, Repository, Between } from 'typeorm';
import { Question } from '../global/entities/question.entity';
import { Answer } from '../global/entities/answer.entity';
import { error } from 'console';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(private dataSource: DataSource) {}
  async createQuestion(questionDto: QuestionDto): Promise<void> {
    const question = this.dataSource.manager.create(Question, {
      question: questionDto.question,
      used_At: questionDto.used_At,
    });

    await this.dataSource.manager.save(question);
  }

  async getQuestion(date?: Date, uuid?: string): Promise<Question> {
    // 해당 날짜의 질문을 가져옴
    let questionRepository: Repository<Question> =
      this.dataSource.getRepository(Question);

    if (uuid) {
      const que = await questionRepository.findOne({
        where: { question_uuid: uuid },
      });
      if (que) {
        return que;
      } else {
        throw error('No Question UUID');
      }
    }
    if (!date) {
      date = new Date();
    }
    const questions = await questionRepository.find({
      where: {
        used_At: Between(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        ),
      },
    });

    if (questions.length > 0) {
      return questions[0];
    }

    const nullquestions = await questionRepository.find({
      where: { used_At: null },
    });

    const newq =
      nullquestions[Math.floor(Math.random() * nullquestions.length)];
    newq.used_At = new Date();

    await questionRepository.save(newq);

    return newq;
  }

  async getAnswersGroup(
    group_uuid: string,
    question_uuid: string,
  ): Promise<{ nickname: string; answer: string; created_at: Date }[]> {
    // 그룹 답변은 과거 조회 무제한
    let answerRepository: Repository<Answer> =
      this.dataSource.getRepository(Answer);

    const answers = await answerRepository.find({
      where: {
        question: {
          question_uuid: question_uuid,
        },
        user: {
          groups: {
            group_uuid: group_uuid,
          },
        },
      },
      relations: { user: true },
    });
    let result = [];
    for (let i = 0; i < answers.length; i += 1) {
      result.push({
        nickname: answers[i].user.nickname,
        answer: answers[i].answer,
        created_at: answers[i].created_At,
      });
    }
    return result;
  }
  async getAnswersPublic(question_uuid: string, age_bound?: [number, number]) {
    // 퍼블릭은 대강 7일 // wip
    let answerRepository: Repository<Answer> =
      this.dataSource.getRepository(Answer);
    let answers: Answer[];
    if (age_bound) {
      answers = await answerRepository.find({
        where: {
          question: {
            question_uuid: question_uuid,
          },
          status: 'public',
          user: {
            age: Between(age_bound[0], age_bound[1]),
          },
        },
        relations: { user: true },
      });
    } else {
      answers = await answerRepository.find({
        where: {
          question: {
            question_uuid: question_uuid,
          },
          status: 'public',
        },
        relations: { user: true },
      });
    }

    let result = [];
    for (let i = 0; i < answers.length; i++) {
      result.push({
        answer: answers[i].answer,
        created_at: answers[i].created_At,
      });
    }
    return result;
  }

  async submitAnswer(
    question_uuid: string,
    user_uuid: string,
    answer: string,
    isPublic: boolean,
  ) {
    let answerRepository: Repository<Answer> =
      this.dataSource.getRepository(Answer);
    try {
      const user = await this.dataSource
        .getRepository(User)
        .findOneBy({ user_uuid: user_uuid });

      const question = await this.dataSource
        .getRepository(Question)
        .findOneBy({ question_uuid: question_uuid });

      let result = await answerRepository.save({
        status: isPublic ? 'public' : 'private',
        answer: answer,
        user: user,
        question: question,
      });
    } catch (e) {
      throw HttpStatus.BAD_REQUEST;
    }
  }

  async getAllAnswers(user_uuid: string): Promise<Answer[]> {
    let answerRepository: Repository<Answer> =
      this.dataSource.getRepository(Answer);

    const answers = await answerRepository.find({
      where: { user: { user_uuid: user_uuid } },
      order: { created_At: 'DESC' },
      relations: { question: true },
    });
    return answers;
  }

  async getMyInfo(user_uuid: string): Promise<User[]> {
    const userRepository: Repository<User> =
      this.dataSource.getRepository(User);
    return await userRepository.find({
      where: { user_uuid: user_uuid },
      relations: { groups: true },
    });
  }
}
