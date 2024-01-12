import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @Length(8, 15)
    password: string;

    @IsEmail()
    email: string;

    role: "INSTRUCTOR" | "STUDENT";
}