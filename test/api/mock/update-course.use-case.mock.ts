import { mockIds } from '.';
import { UpdateCourseUseCaseDto } from '../../../src/application/use-case';
import { Course } from '../../../src/domain';

export const updateCourseUseCaseMock = {
    execute: ({ id }: UpdateCourseUseCaseDto): Course => {
        return new Course(id, '1', '', mockIds.coachId);
    },
};
