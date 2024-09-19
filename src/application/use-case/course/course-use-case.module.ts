import { Module } from '@nestjs/common';
import { CreateCourseUseCase } from './create-course';
import { GetCoursesUseCase } from './get-courses';
import { UpdateCourseUseCase } from './update-course';
import { GetCourseByIdUseCase } from './get-course-by-id';
import { DeleteCourseUseCase } from './delete-course';

const useCases = [
    CreateCourseUseCase,
    GetCoursesUseCase,
    UpdateCourseUseCase,
    GetCourseByIdUseCase,
    DeleteCourseUseCase,
];

@Module({
    providers: useCases,
    exports: useCases,
})
export class CourseUseCaseModule {}
