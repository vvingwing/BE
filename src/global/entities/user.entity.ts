import { Column, Entity, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Answer } from './answer.entity';
import { Group } from './group.entity';

@Entity('user_tb')
export class User {
  @PrimaryColumn()
  user_uuid: string;

  @Column()
  user_name: string;

  @Column()
  age: number;

  @Column()
  nickname: string;

  @Column({ default: false })
  user_id: string;

  @Column()
  user_password: string;

  @OneToMany(() => Answer, (Answer) => Answer.user)
  answers: Answer[];

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups: Group[];

  @ManyToMany(() => Answer, (Answer) => Answer.liked_users)
  liked_answers: Answer[]
}
