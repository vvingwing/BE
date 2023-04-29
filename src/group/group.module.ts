import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { GroupService } from "./group.service";
import { Group } from "src/global/entities/group.entity";
import { User } from "src/global/entities/user.entity";


@Module({

    imports: [TypeOrmModule.forFeature([Group, User])],
    providers: [GroupService]
})
export class GroupModule { }