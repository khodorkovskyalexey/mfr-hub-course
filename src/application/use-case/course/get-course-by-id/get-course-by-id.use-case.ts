import { Injectable } from '@nestjs/common';
import { Course, CourseRepository } from '../../../../domain';
import { GetCourseByIdUseCaseDto } from './get-course-by-id.use-case.dto';

@Injectable()
export class GetCourseByIdUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute({ id }: GetCourseByIdUseCaseDto): Promise<Course> {
        const course = await this.courseRepository.getById(id);

        if (!course) {
            throw new Error('Course not found');
        }

        return course;
    }
}
