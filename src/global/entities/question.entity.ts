import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

@Entity('question_tb')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  question_uuid: string;

  @Column()
  question: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  used_At: Date;

  @CreateDateColumn()
  created_At: Date;

  @OneToMany(() => Answer, (Answer) => Answer.question)
  answers: Answer[];
}
