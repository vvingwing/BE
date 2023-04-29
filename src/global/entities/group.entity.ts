import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';

@Entity('group_tb')
export class Group {
  @PrimaryColumn()
  group_uuid: string;

  @Column()
  group_name: string;

  @Column()
  group_code: string;

  @ManyToMany(() => User, (user) => user.groups)
  users: User[]
}
