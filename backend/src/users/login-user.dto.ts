import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
    @IsString()
    @Length(8, 15)
    password: string;

    @IsEmail()
    email: string;

    role: "INSTRUCTOR" | "STUDENT";
}