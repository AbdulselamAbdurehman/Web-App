import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService){}
  
        async login(email: string, role: string, password: string): Promise<{token: string}> {
          const user = await this.usersService.findOne(email);
        
          if (!user || user.role !== role) {
            throw new UnauthorizedException("User does not exist!");
          }
          bcrypt.genSalt()
          const isMatch = await bcrypt.compare(password, user.password);
        
          if (!isMatch) {
            throw new UnauthorizedException("Wrong Password!");
          }
        
          const payload = { sub: user.email, role: user.role };
          return {
            token: await this.jwtService.signAsync(payload),
          };
        }
              

}
