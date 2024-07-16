import { Injectable } from '@nestjs/common';
import { CreateCourseUseCaseDto } from './create-course.use-case.dto';
import { Course, CourseRepository } from '../../../../domain';

@Injectable()
export class CreateCourseUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute(dto: CreateCourseUseCaseDto): Promise<Course> {
        const sameCourse = await this.courseRepository.get(
            { coachId: dto.coachId, name: dto.name },
            { limit: 1 },
        );
        if (sameCourse.length) {
            throw new Error('Course already exist');
        }

        const course = Course.create(dto);

        return this.courseRepository.add(course);
    }
}
