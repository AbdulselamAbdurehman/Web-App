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
  async postQuestions(@Body() data: { question: CreateQuestionDto; email: string }): Promise<Question> {
    return await this.questionsService.createQuestion(data.question, data.email);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('INSTRUCTOR') // Only INSTRUCTORS can access this route
  @Patch(':num')
  updateQuestion(@Param('num') num: number, @Body() data: { question: UpdateQuestionDto; email: string }): Promise<Question> {
    return this.questionsService.updateQuestion(num, data.question, data.email);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('INSTRUCTOR') // Only INSTRUCTORS can access this route
  @Delete(':num')
  deleteQuestion(@Param('num') num: number, @Body() email): void {
    const removedQuestion = this.questionsService.deleteQuestion(num, email);
    console.log(removedQuestion);
  }
}
