import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Question } from 'src/questions/question.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  name: string;

  @Prop({required:true, unique:true})
  email: string;

  @Prop()
  password: string;

  @Prop({type: [{type: mongoose.Schema.ObjectId, ref: 'Question'}]})
  solved: Question[];
}
    

export const StudentSchema = SchemaFactory.createForClass(Student);