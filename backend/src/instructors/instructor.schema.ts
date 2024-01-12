import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Question } from 'src/questions/question.schema';


export type InstructorDocument = HydratedDocument<Instructor>;

@Schema()
export class Instructor {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]})
  posts: Question[];  
}
    
export const InstructorSchema = SchemaFactory.createForClass(Instructor);