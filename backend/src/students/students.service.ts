import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { CreateStudentDto } from './create-Student.dto';
import { NotFoundException } from '@nestjs/common';
import { LoginStudentDto } from './login-student.dto';


@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private StudentModel: Model<Student>) {}

  async signupStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.StudentModel({...createStudentDto, solved:[]});
    return createdStudent.save();
  }

  async loginStudent(loginStudentDto: LoginStudentDto): Promise<Student> {
    const student = await this.StudentModel.findOne({
      email: loginStudentDto.email,
      password: loginStudentDto.password,
    }).exec();
  
    if (!student) {
      throw new NotFoundException("User Not Found");
    }
  
    return student;
  }

}
