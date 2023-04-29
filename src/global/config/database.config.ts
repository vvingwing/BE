import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.MYSQL_DATABASE_HOST,
  port: process.env.MYSQL_DATABASE_PORT,
  database: process.env.MYSQL_DATABASE_NAME,
  username: process.env.MYSQL_DATABASE_USER,
  password: process.env.MYSQL_DATABASE_PASSWORD,
  entities: [User, Group, Question, Answer],
  synchronize: true,
}));
