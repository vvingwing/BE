import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('question_tb')
export class Question {
  @PrimaryColumn()
  question_uuid: string;

  @Column()
  question: string;

  @Column({ type: 'timestamp' })
  upload_date: Date;

  @CreateDateColumn()
  created_At: Date;
}
