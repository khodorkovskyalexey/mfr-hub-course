import { Injectable } from '@nestjs/common';
import { Course, CourseRepository } from '../../../../domain';
import { UpdateCourseUseCaseDto } from './update-course.use-case.dto';

@Injectable()
export class UpdateCourseUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute({ id, updates }: UpdateCourseUseCaseDto): Promise<Course> {
        const course = await this.courseRepository.getById(id);
        if (!course) {
            throw new Error('Course not found');
        }

        const updatedCourse = new Course(
            id,
            updates.name ?? course.name,
            updates.description ?? course.description,
            course.coachId,
        );

        const sameCourse = await this.courseRepository.get(
            {
                coachId: updatedCourse.coachId,
                name: updatedCourse.name,
            },
            { limit: 1 },
        );
        if (sameCourse.some((course) => !course.id.isEqual(updatedCourse.id))) {
            throw new Error('Course already exist');
        }

        return this.courseRepository.update(updatedCourse);
    }
}
