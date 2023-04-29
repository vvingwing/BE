import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('group_tb')
export class Group {
  @PrimaryColumn()
  group_uuid: string;

  @Column()
  group_name: string;

  @Column()
  group_code: string;
}
