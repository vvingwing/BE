import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

}