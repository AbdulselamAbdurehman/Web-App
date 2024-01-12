import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './question.schema';
import { CreateQuestionDto } from './create-question.dto';
import { UpdateQuestionDto } from './update-question.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(AuthGuard) //All users(INSTRUCTORS | STUDENTS) can access the route.
  @Get()
  async findSome(): Promise<Question[]> {
    return await this.questionsService.findSome();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('INSTRUCTOR') // Only INSTRUCTORS can access this route
  @Post()
  async postQuestions(@Body() question: CreateQuestionDto): Promise<Question> {
    return await this.questionsService.createQuestion(question);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('INSTRUCTOR') // Only INSTRUCTORS can access this route
  @Patch(':num')
  updateQuestion(@Param('num') num: number, @Body() question: UpdateQuestionDto): Promise<Question> {
    return this.questionsService.updateQuestion(num, question);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('INSTRUCTOR') // Only INSTRUCTORS can access this route
  @Delete(':num')
  deleteQuestion(@Param('num') num: number): void {
    const removedQuestion = this.questionsService.deleteQuestion(num);
    console.log(removedQuestion);
  }
}
