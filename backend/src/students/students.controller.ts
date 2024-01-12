import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './create-Student.dto';
import { ValidationPipe } from '@nestjs/common';
import { LoginStudentDto } from './login-student.dto';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get("/login")  //login a student user
    login(@Body(ValidationPipe) loginStudentDto: LoginStudentDto){
        return this.studentsService.loginStudent(loginStudentDto);
    }

    @Post("/signup") // create a new user account
    create(@Body(ValidationPipe) createStudentDto: CreateStudentDto){
        return this.studentsService.signupStudent(createStudentDto)
    }
}