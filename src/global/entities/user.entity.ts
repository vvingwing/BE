import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
