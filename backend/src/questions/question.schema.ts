import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Instructor } from 'src/instructors/instructor.schema';


export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  description: string;

  @Prop()
  answer: number;

  @Prop()
  explanation: string;

  @Prop()
  questionNumber: number;
  
  @Prop()
  options: [string];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' })
  poster: Instructor;  
}
    


export const QuestionSchema = SchemaFactory.createForClass(Question);