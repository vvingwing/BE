import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { Group } from 'src/global/entities/group.entity';
import { User } from 'src/global/entities/user.entity';
import { GroupController } from './group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
