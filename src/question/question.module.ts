import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { QuestionService } from "./question.service";

@Module({
    providers: [QuestionService],
})
export class QuestionModule { }