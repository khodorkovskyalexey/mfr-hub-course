import { Module } from '@nestjs/common';
import { CreateCourseUseCase } from './create-course';
import { GetCoursesUseCase } from './get-courses';

const useCases = [CreateCourseUseCase, GetCoursesUseCase];

@Module({
    providers: useCases,
    exports: useCases,
})
export class CourseUseCaseModule {}
