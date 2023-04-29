import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('group_tb')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  group_uuid: string;

  @Column()
  group_name: string;

  @Column()
  group_code: string;

  @ManyToMany(() => User, (user) => user.groups)
  users: User[];
}
