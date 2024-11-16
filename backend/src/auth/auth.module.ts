import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard';
import {  JWT_EXPIRATION, JWT_SECRET } from 'src/constants';

@Module({
imports: [UsersModule,
   JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: JWT_EXPIRATION },
   })],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
})
export class AuthModule {}
