import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './create-instructor.dto';
import { ValidationPipe } from '@nestjs/common';
import { LoginInstructorDto } from './login-instructor.dto';

@Controller('instructors')
export class InstructorsController {
    constructor(private readonly instructorsService: InstructorsService) { }

    @Get("/login")  //login a Instructor user
    login(@Body(ValidationPipe) loginInstructorDto: LoginInstructorDto){
        return this.instructorsService.loginInstructor(loginInstructorDto);
    }

    @Post("/signup") // create a new user account
    create(@Body(ValidationPipe) createInstructorDto: CreateInstructorDto){
        return this.instructorsService.signupInstructor(createInstructorDto)
    }
}