import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async signupUser(createUserDto: CreateUserDto): Promise<User>{
    const saltOrRounds = 10;

    if (await this.UserModel.findOne({email: createUserDto.email})){
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const createdUser = new this.UserModel({...createUserDto, questions:[], password:hashedPassword});
    console.log("from users.service.ts");
    return createdUser.save();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.UserModel.findOne({email}).exec();
    return user;
  }
  
}
