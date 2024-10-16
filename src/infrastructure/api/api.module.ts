import { Module } from '@nestjs/common';
import { UseCaseModule } from '../../application/use-case';
import { CourseController } from './course/course.controller';
import { PracticeController } from './practice/practice.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [CourseController, PracticeController],
})
export class ApiModule {}
