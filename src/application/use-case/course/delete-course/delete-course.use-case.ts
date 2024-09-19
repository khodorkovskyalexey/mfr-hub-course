import { Injectable } from '@nestjs/common';
import { DeleteCourseUseCaseDto } from './delete-course.use-case.dto';
import { CourseRepository } from '../../../../domain';

@Injectable()
export class DeleteCourseUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute({ id }: DeleteCourseUseCaseDto): Promise<void> {
        await this.courseRepository.delete(id);
    }
}
