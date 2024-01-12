import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @Length(8, 15)
    password: string;

    @IsEmail()
    email: string;
}