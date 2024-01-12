import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Instructor } from './instructor.schema';
import { CreateInstructorDto } from './create-instructor.dto';
import { NotFoundException } from '@nestjs/common';
import { LoginInstructorDto } from './login-instructor.dto';

@Injectable()
export class InstructorsService {
  constructor(@InjectModel(Instructor.name) private InstructorModel: Model<Instructor>) {}

  async signupInstructor(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    const createdInstructor = new this.InstructorModel({...createInstructorDto, posts:[]});
    return createdInstructor.save();
  }

  async loginInstructor(loginInstructorDto: LoginInstructorDto): Promise<Instructor> {
    const instructor = await this.InstructorModel.findOne({
      email: loginInstructorDto.email,
      password: loginInstructorDto.password,
    }).exec();
  
    if (!instructor) {
      throw new NotFoundException("User Not Found");
    }
  
    return instructor;
  }
  

}
