import { Injectable } from '@nestjs/common';
import { Course, CourseRepository, Id, Practice } from '../../../../domain';
import { AddPracticeUseCaseDto } from './add-practice.use-case.dto';

@Injectable()
export class AddPracticeUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute({
        coachId,
        courseId,
        ...practice
    }: AddPracticeUseCaseDto): Promise<Course> {
        const course = await this.courseRepository.getById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        this.checkCoachAccessToCourse(course, coachId);

        course.addPractice(Practice.create(practice));

        return this.courseRepository.update(course);
    }

    private checkCoachAccessToCourse(course: Course, coachId: Id): void {
        if (!course.unpack().coachId.isEqual(coachId)) {
            throw new Error('You can add practice only into your own course');
        }
    }
}
