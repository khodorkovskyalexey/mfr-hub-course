import { Injectable } from '@nestjs/common';
import { Course, CourseRepository, Id } from '../../../../domain';
import { UpdateCourseUseCaseDto } from './update-course.use-case.dto';

@Injectable()
export class UpdateCourseUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute({ id, updates }: UpdateCourseUseCaseDto): Promise<Course> {
        const course = await this.courseRepository.getById(id);
        if (!course) {
            throw new Error('Course not found');
        }
        course.update(updates);

        await this.throwIfCourseExist(course);

        return this.courseRepository.update(course);
    }

    private async throwIfCourseExist(course: Course): Promise<void> {
        const { id, name, coachId } = course.unpack();

        const sameCourse = await this.courseRepository.get(
            {
                coachId,
                name,
                notIds: [id],
            },
            { limit: 1 },
        );
        if (sameCourse.length) {
            throw new Error('Course already exist');
        }
    }
}
