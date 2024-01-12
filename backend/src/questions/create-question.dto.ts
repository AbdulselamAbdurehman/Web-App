import { IsString, IsNotEmpty, IsArray } from "class-validator";

export class CreateQuestionDto{
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    answer: number;

    @IsArray()
    options: string[];

    @IsString()
    explanation: string;
}