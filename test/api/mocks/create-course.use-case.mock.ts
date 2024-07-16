import { CreateCourseUseCaseDto } from '../../../src/application/use-case';
import { Course } from '../../../src/domain';

let course: Course | undefined;

export const createCourseUseCaseMock = {
    execute: (dto: CreateCourseUseCaseDto): Course => {
        if (!course) {
            course = Course.create(dto);
        }

        return course;
    },
    reset: () => {
        course = undefined;
    },
};
