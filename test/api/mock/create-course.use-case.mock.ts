import { mockIds } from '.';
import { CreateCourseUseCaseDto } from '../../../src/application/use-case';
import { Course } from '../../../src/domain';

export const createCourseUseCaseMock = {
    execute: (dto: CreateCourseUseCaseDto): Course => {
        return new Course(mockIds.id, dto.name, dto.description, dto.coachId);
    },
};
