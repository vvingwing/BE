import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';

@Entity('answer_tb')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  answer_uuid: string;

  @Column()
  status: string;

  @Column()
  answer: string;

  @CreateDateColumn()
  created_At: Date;

  @ManyToOne(() => User, (User) => User.answers)
  user: User;

  @ManyToOne(() => Question, (Question) => Question.answers)
  question: Question;

  @ManyToMany(() => User, (Answer) => Answer.liked_answers)
  @JoinTable()
  liked_users: User[];
}
