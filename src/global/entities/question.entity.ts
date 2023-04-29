import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('question_tb')
export class Question {
  @PrimaryColumn()
  question_uuid: string;

  @Column()
  question: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  used_At: Date;

  @CreateDateColumn()
  created_At: Date;
}
