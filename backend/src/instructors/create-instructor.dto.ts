import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateInstructorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @Length(8, 15)
    password: string;

    @IsEmail()
    email: string;
}