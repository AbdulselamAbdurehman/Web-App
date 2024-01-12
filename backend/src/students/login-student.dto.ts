import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginStudentDto {
    @IsString()
    @Length(8, 15)
    password: string;

    @IsEmail()
    email: string;
}