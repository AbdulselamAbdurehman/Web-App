import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  questions: number[];
  
  @Prop()
  role: "INSTRUCTOR" | "STUDENT";
}
    
export const UserSchema = SchemaFactory.createForClass(User);