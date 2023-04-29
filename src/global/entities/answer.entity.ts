import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('answer_tb')
export class Answer {
  @PrimaryColumn()
  answer_uuid: string;

  @Column()
  status: string;

  @Column()
  answer: string;

  @CreateDateColumn()
  created_At: Date;
}
