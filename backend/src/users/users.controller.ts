import { Body, Controller, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Post("/signup") // create a new user account
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){
        console.log("from users.controller.ts");
        return this.usersService.signupUser(createUserDto);
    }
}