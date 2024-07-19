import { Module } from '@nestjs/common';
import { CreateCourseUseCase } from './create-course';
import { GetCoursesUseCase } from './get-courses';
import { UpdateCourseUseCase } from './update-course';

const useCases = [CreateCourseUseCase, GetCoursesUseCase, UpdateCourseUseCase];

@Module({
    providers: useCases,
    exports: useCases,
})
export class CourseUseCaseModule {}
