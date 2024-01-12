import { Module } from '@nestjs/common';
import { InstructorsController } from './instructors.controller';
import { InstructorsService } from './instructors.service';
import { Instructor, InstructorSchema } from './instructor.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Instructor.name, schema: InstructorSchema }])],
  controllers: [InstructorsController],
  providers: [InstructorsService],
  exports: [MongooseModule]
})
export class InstructorsModule {}
