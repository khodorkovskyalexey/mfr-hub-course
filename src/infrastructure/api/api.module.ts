import { Module } from '@nestjs/common';
import { UseCaseModule } from '../../application/use-case';
import { CourseController } from './course/course.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [CourseController],
})
export class ApiModule {}
