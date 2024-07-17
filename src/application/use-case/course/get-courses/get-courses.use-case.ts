import { Injectable } from '@nestjs/common';
import { Course, CourseRepository } from '../../../../domain';
import { GetCoursesFilterDto } from './get-courses.use-case.dto';

@Injectable()
export class GetCoursesUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute(filter: GetCoursesFilterDto = {}): Promise<Course[]> {
        return this.courseRepository.get(filter);
    }
}
