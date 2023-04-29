import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from '../global/entities/group.entity';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async createGroup(
    @Query('user_uuid') user_uuid: string,
    @Query('group_name') group_name: string,
  ): Promise<Group> {
    return await this.groupService.createGroup(user_uuid, group_name);
  }

  @Post('join')
  @UseGuards(JwtGuard)
  async joinGroup(
    @Query('user_uuid') user_uuid: string,
    @Query('join_code') join_code: string,
  ): Promise<string> {
    await this.groupService.joinGroup(user_uuid, join_code);
    return 'success';
  }

  @Get('info')
  @UseGuards(JwtGuard)
  async getGroupInfo(@Query('group_uuid') group_uuid: string): Promise<Group> {
    return await this.groupService.getGroupInfo(group_uuid);
  }
}
