import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { Instructor } from "src/instructors/instructor.schema";

export class CreateQuestionDto{
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    answer: number;

    @IsArray()
    options: string[];

    poster: Instructor;

}