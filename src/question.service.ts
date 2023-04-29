import { Injectable } from "@nestjs/common";
import { User } from "./global/entities/user.entity";
import { DataSource, Repository, Between } from "typeorm";
import { Question } from "./global/entities/question.entity";
import { Answer } from "./global/entities/answer.entity";

@Injectable()
export class QuestionService {
    constructor(
        private dataSource: DataSource
    ) { };

    async getQuestion(date?: Date): Promise<string> { // 해당 날짜의 질문을 가져옴

        let questionRepository: Repository<Question> = this.dataSource.getRepository(Question);

        if (!date) {
            date = new Date();
        }
        const questions = await questionRepository.find({
            where: {
                used_At: Between(new Date(date.getFullYear(), date.getMonth(), date.getDate()), new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
            }
        });

        if (questions) {
            return questions[0].question;
        }

        const nullquestions = await questionRepository.find({ where: { used_At: null } });
        const newq = nullquestions[Math.floor(Math.random() * nullquestions.length)];
        newq.used_At = new Date();

        await questionRepository.save(newq);

        return newq.question;

    }

    async getAnswersGroup(group_uuid: string, question_uuid: string): Promise<{ nickname: string, answer: string, created_at: Date }[]> { // 그룹 답변은 과거 조회 무제한
        let answerRepository: Repository<Answer> = this.dataSource.getRepository(Answer);

        const answers = await answerRepository.find({
            where: {
                question: {
                    question_uuid: question_uuid
                },
                user: {
                    groups: {
                        group_uuid: group_uuid
                    }
                }
            }, relations: { user: true }
        });
        let result = [];
        for (let i = 0; i < answers.length; i += 1) {
            result.push({ nickname: answers[i].user.nickname, answer: answers[i].answer, created_at: answers[i].created_At });
        }
        return result
    }

    async getAnswersPublic(question_uuid: string) { // 퍼블릭은 대강 7일 // wip
        let answerRepository: Repository<Answer> = this.dataSource.getRepository(Answer);

        const answers = await answerRepository.find({
            where: {
                question: {
                    question_uuid: question_uuid
                },
                status: "public"
            }, relations: { user: true }
        });

        let result = [];
        for (let i = 0; i < answers.length; i++) {
            result.push({ answer: answers[i].answer, created_at: answers[i].created_At });
        }
        return result
    }

    async submitAnswer(answer: string, ispublic: boolean) {

    }
}