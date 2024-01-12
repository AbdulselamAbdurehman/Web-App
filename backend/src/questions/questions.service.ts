import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './question.schema';
import { CreateQuestionDto } from './create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private QuestionModel: Model<Question>) {}

//   async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
//     const createdQuestion = new this.QuestionModel(createQuestionDto);
//     return createdQuestion.save();
//   }

//   async findAll(): Promise<Question[]> {
//     return this.QuestionModel.find().exec();
//   }
}
