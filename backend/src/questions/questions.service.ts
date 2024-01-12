import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './question.schema';
import { CreateQuestionDto } from './create-question.dto';
import { UpdateQuestionDto } from './update-question.dto';
import { UsersService } from 'src/users/users.service';
import { Counter } from 'src/counter.schema';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private QuestionModel: Model<Question>,
              @InjectModel(Counter.name) private CounterModel: Model<Counter>,
              private readonly usersService: UsersService) {}

  async createQuestion(createQuestionDto: CreateQuestionDto, userEmail: string): Promise<Question> {
    const question = new this.QuestionModel(createQuestionDto);
    const counter = await this.CounterModel.findOneAndUpdate(
      {},
      { $inc: { value: 1 } },
      { upsert: true, new: true },
    );
    console.log(createQuestionDto.description);
    question.questionNumber = counter.value;

    return question.save();
  }

            
      
  async findSome(): Promise<Question[]> {
    return await this.QuestionModel.find().exec();
  }


  async updateQuestion(questionNumber: number, question: UpdateQuestionDto, email: string): Promise<Question> {
      const updatedQuestion = await this.QuestionModel.findOneAndUpdate(
        { questionNumber},
        { $set: question },
        { new: true }
      ).exec();
      console.log(updatedQuestion);
      return updatedQuestion;
  }
  
  async deleteQuestion(questionNumber: number, email: string): Promise<Question>{
    const removedQuestion = await this.QuestionModel.findOneAndDelete({questionNumber}).exec();
    return removedQuestion;
  } 
}
