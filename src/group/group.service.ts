import { Injectable, HttpStatus } from '@nestjs/common';
import { Group } from 'src/global/entities/group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/global/entities/user.entity';
import { randomInt } from 'crypto';
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getGroupInfo(group_uuid: string): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { group_uuid: group_uuid },
      relations: { users: true },
    });
  }

  async createGroup(user_uuid: string, group_name: string): Promise<Group> {
    let user_me = await this.userRepository.findOne({ where: { user_uuid } });
    if (!user_me) {
      throw HttpStatus.NOT_FOUND;
    }
    const result = await this.groupRepository.save({
      group_name,
      group_code: randomInt(0, 1000000).toString().padStart(6, '0'),
      users: [user_me],
    });
    return result;
  }

  async joinGroup(
    user_uuid: string,
    group_uuid: string,
    join_code: string,
  ): Promise<void> {
    const user_me = await this.userRepository.findOne({ where: { user_uuid } });
    if (!user_me) {
      throw HttpStatus.NOT_FOUND;
    }
    const group = await this.groupRepository.findOneBy({ group_uuid });
    if (!group) {
      throw HttpStatus.NOT_FOUND;
    }
    if (group.group_code == join_code) {
      //append

      group.users.push(user_me);
      await this.groupRepository.save(group);
    } else {
      throw HttpStatus.UNAUTHORIZED;
    }
  }
}
