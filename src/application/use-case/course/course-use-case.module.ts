import { Module } from '@nestjs/common';
import { CreateCourseUseCase } from './create-course';

@Module({
    providers: [CreateCourseUseCase],
    exports: [CreateCourseUseCase],
})
export class CourseUseCaseModule {}
